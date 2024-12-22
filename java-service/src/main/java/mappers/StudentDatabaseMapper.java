package mappers;

import entities.Student;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class StudentDatabaseMapper extends EntityDatabaseMapper<Student> {
    public static final String SELECT_ALL_SQL = "SELECT * "
        + "FROM student";

    public static final String SELECT_BY_ID_SQL = "SELECT * "
        + "FROM student "
        + "WHERE id = ?";

    public static final String INSERT_SQL = "INSERT INTO student "
        + "(\"firstName\", \"lastName\", \"patronymic\", \"groupId\") "
        + "VALUES "
        + "(?, ?, ?, ?)";

    public static final String UPDATE_SQL = "UPDATE student SET "
        + "\"firstName\" = ?, \"lastName\" = ?, \"patronymic\" = ?, \"groupId\" = ? "
        + "WHERE id = ?";

    public static final String DELETE_SQL = "DELETE FROM student WHERE id = ?";

    public StudentDatabaseMapper(Connection connection) { super(connection); }

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

    public List<Student> findAll() throws SQLException {
        List<Student> students = new ArrayList<>();
        findByCriteria(SELECT_ALL_SQL, null, students::add);

        return students;
    }

    @Override
    protected void fillCreateStatement(PreparedStatement statement, Student student) throws SQLException {
        statement.setString(1, student.getFirstName());
        statement.setString(2, student.getLastName());
        statement.setString(3, student.getPatronymic());
        statement.setInt(4, student.getGroupId());
    }

    @Override
    protected void fillUpdateStatement(PreparedStatement statement, Student student) throws SQLException {
        this.fillCreateStatement(statement, student);
        statement.setInt(5, student.getId());
    }

    @Override
    protected Student parseResultSet(ResultSet resultSet) throws SQLException {
        Student student = new Student();
        student.setId(resultSet.getInt("id"));
        student.setFirstName(resultSet.getString("firstName"));
        student.setLastName(resultSet.getString("lastName"));
        student.setPatronymic(resultSet.getString("patronymic"));
        student.setGroupId(resultSet.getInt("groupId"));

        return student;
    }
}
