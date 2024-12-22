package mappers;

import entities.Entity;

import java.sql.*;
import java.util.Objects;

abstract public class EntityDatabaseMapper<E extends Entity> {
    private final Connection connection;

    protected EntityDatabaseMapper(Connection connection) {
        this.connection = connection;
    }

    protected final Connection getConnection() {
        return connection;
    }

    public E findById(Integer id) throws SQLException {
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            statement = getConnection().prepareStatement(readByIdQuery());
            statement.setInt(1, id);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return parseResultSet(resultSet);
            } else {
                return null;
            }

        } finally {
            try { Objects.requireNonNull(resultSet).close(); } catch(Exception ignored) {}
            try { Objects.requireNonNull(statement).close(); } catch(Exception ignored) {}
        }
    }

    public Integer create(E entity) throws SQLException {
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            statement = getConnection().prepareStatement(createQuery(), Statement.RETURN_GENERATED_KEYS);
            fillCreateStatement(statement, entity);
            statement.executeUpdate();
            resultSet = statement.getGeneratedKeys();
            resultSet.next();

            return resultSet.getInt(1);
        } finally {
            try { Objects.requireNonNull(resultSet).close(); } catch(Exception ignored) {}
            try { Objects.requireNonNull(statement).close(); } catch(Exception ignored) {}
        }
    }

    public void update(E entity) throws SQLException {
        PreparedStatement statement = null;
        try {
            statement = getConnection().prepareStatement(updateQuery());
            fillUpdateStatement(statement, entity);
            statement.executeUpdate();
        } finally {
            try { Objects.requireNonNull(statement).close(); } catch(Exception ignored) {}
        }
    }

    public void delete(Integer id) throws SQLException {
        PreparedStatement statement = null;
        try {
            statement = getConnection().prepareStatement(deleteQuery());
            statement.setInt(1, id);
            statement.executeUpdate();
        } finally {
            try { Objects.requireNonNull(statement).close(); } catch(Exception ignored) {}
        }
    }

    protected final void findByCriteria(String sql, SearchCriteriaFilter filter, FoundEntityHandler<E> entityHandler) throws SQLException {
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            statement = getConnection().prepareStatement(sql);

            if (filter != null) {
                filter.fillSearchCriteria(statement);
            }

            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                entityHandler.processHandler(parseResultSet(resultSet));
            }
        } finally {
            try { Objects.requireNonNull(resultSet).close(); } catch(Exception ignored) {}
            try { Objects.requireNonNull(statement).close(); } catch(Exception ignored) {}
        }
    }

    abstract protected String readByIdQuery();
    abstract protected String createQuery();
    abstract protected String updateQuery();
    abstract protected String deleteQuery();

    abstract protected void fillCreateStatement(PreparedStatement statement, E entity) throws SQLException;
    abstract protected void fillUpdateStatement(PreparedStatement statement, E entity) throws SQLException;
    abstract protected E parseResultSet(ResultSet resultSet) throws SQLException;

    protected interface SearchCriteriaFilter {
        void fillSearchCriteria(PreparedStatement statement) throws SQLException;
    }

    protected interface FoundEntityHandler<E extends Entity> {
        void processHandler(E entity);
    }
}
