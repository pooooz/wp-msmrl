package services;

import entities.Student;
import mappers.StudentDatabaseMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

public class StudentsService {
    private StudentDatabaseMapper studentDatabaseMapper = null;

    public StudentsService(String jdbcDriver, String jdbcUrl, String jdbcUser, String jdbcPassword) throws ClassNotFoundException, SQLException {
        Class.forName(jdbcDriver);

        Connection dbConnection = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPassword);

        this.studentDatabaseMapper = new StudentDatabaseMapper(dbConnection);
    }

    public Integer create(Student student) throws SQLException {
        return this.studentDatabaseMapper.create(student);
    }

    public void update(Student student) throws SQLException {
        this.studentDatabaseMapper.update(student);
    }

    public void delete(Integer studentId) throws SQLException {
        this.studentDatabaseMapper.delete(studentId);
    }

    public List<Student> findAll() throws SQLException {
        List<Student> students = this.studentDatabaseMapper.findAll();

        return students;
    }

    public Student findById(Integer studentId) throws SQLException {
        Student student = this.studentDatabaseMapper.findById(studentId);

        return student;
    }

    public StudentDatabaseMapper getStudentDatabaseMapper() { return this.studentDatabaseMapper; }
}
