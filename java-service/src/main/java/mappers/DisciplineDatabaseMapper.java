package mappers;

import entities.Discipline;
import entities.DisciplineControlForm;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DisciplineDatabaseMapper extends EntityDatabaseMapper<Discipline> {
    public static final String SELECT_ALL_SQL = "SELECT * "
        + "FROM discipline";

    public static final String SELECT_BY_ID_SQL = "SELECT * "
        + "FROM discipline "
        + "WHERE id = ?";

    public static final String SELECT_BY_NAME_SQL = "SELECT * "
        + "FROM discipline "
        + "WHERE name = ?";

    public static final String INSERT_SQL = "INSERT INTO discipline "
        + "(\"name\", \"controlForm\") "
        + "VALUES "
        + "(?, ?)";

    public static final String UPDATE_SQL = "UPDATE discipline SET "
        + "\"name\" = ?, \"controlForm\" = ? "
        + "WHERE id = ?";

    public static final String DELETE_SQL = "DELETE FROM discipline WHERE id = ?";

    public DisciplineDatabaseMapper(Connection connection) { super(connection); }

    @Override
    protected String readByIdQuery() {
        return SELECT_BY_ID_SQL;
    }

    @Override
    protected String createQuery() {
        return INSERT_SQL;
    }

    @Override
    protected String updateQuery() {
        return UPDATE_SQL;
    }

    @Override
    protected String deleteQuery() {
        return DELETE_SQL;
    }

    public List<Discipline> findAll() throws SQLException {
        List<Discipline> disciplines = new ArrayList<>();
        findByCriteria(SELECT_ALL_SQL, null, disciplines::add);
        return disciplines;
    }

    public Discipline findByName(String name) throws SQLException {
        List<Discipline> disciplines = new ArrayList<>();

        System.out.println("HERE");
        findByCriteria(
                SELECT_BY_NAME_SQL,
                statement -> {
                    statement.setString(1, name);
                },
                disciplines::add
        );

        System.out.println("NOT HERE");

        if (disciplines.size() != 0) return disciplines.getFirst();

        return null;
    }

    @Override
    protected void fillCreateStatement(PreparedStatement statement, Discipline discipline) throws SQLException {
        statement.setString(1, discipline.getName());
        statement.setObject(2, discipline.getControlForm().toString(), Types.OTHER);
    }

    @Override
    protected void fillUpdateStatement(PreparedStatement statement, Discipline discipline) throws SQLException {
        this.fillCreateStatement(statement, discipline);
        statement.setInt(3, discipline.getId());
    }

    @Override
    protected Discipline parseResultSet(ResultSet resultSet) throws SQLException {
        Discipline discipline = new Discipline();
        discipline.setId(resultSet.getInt("id"));
        discipline.setName(resultSet.getString("name"));
        discipline.setControlForm(DisciplineControlForm.valueOf(resultSet.getString("controlForm")));

        return discipline;
    }
}
