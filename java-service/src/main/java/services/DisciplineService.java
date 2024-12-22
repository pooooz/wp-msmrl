package services;

import entities.Discipline;
import mappers.DisciplineDatabaseMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

public class DisciplineService {
    private DisciplineDatabaseMapper disciplineDatabaseMapper = null;

    public DisciplineService(String jdbcDriver, String jdbcUrl, String jdbcUser, String jdbcPassword) throws ClassNotFoundException, SQLException {
        Class.forName(jdbcDriver);

        Connection dbConnection = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPassword);

        this.disciplineDatabaseMapper = new DisciplineDatabaseMapper(dbConnection);
    }

    public Integer create(Discipline discipline) throws SQLException {
        return this.disciplineDatabaseMapper.create(discipline);
    }

    public void update(Discipline discipline) throws SQLException {
        this.disciplineDatabaseMapper.update(discipline);
    }

    public void delete(Integer disciplineId) throws SQLException {
        this.disciplineDatabaseMapper.delete(disciplineId);
    }

    public List<Discipline> findAll() throws SQLException {
        List<Discipline> disciplines = this.disciplineDatabaseMapper.findAll();

        return disciplines;
    }

    public Discipline findById(Integer disciplineId) throws SQLException {
        Discipline discipline = this.disciplineDatabaseMapper.findById(disciplineId);

        return discipline;
    }

    public Discipline findByName(String disciplineName) throws SQLException {
        Discipline discipline = this.disciplineDatabaseMapper.findByName(disciplineName);

        return discipline;
    }

    public DisciplineDatabaseMapper getStudentDatabaseMapper() { return this.disciplineDatabaseMapper; }
}
