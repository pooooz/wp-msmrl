package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import entities.Discipline;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.DisciplineService;
import services.StudentsService;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/disciplines")
public class DisciplineServlet extends HttpServlet {
    DisciplineService disciplineService;

    @Override
    public void init() throws ServletException {
        try {
            String user = System.getenv("DB_USER");
            String password = System.getenv("DB_PASSWORD");
            String connectionString = System.getenv("DB_CONNECTION_STRING");
            String driver = System.getenv("DB_DRIVER");

            this.disciplineService = new DisciplineService(
                    driver,
                    connectionString,
                    user,
                    password
            );
        } catch(ClassNotFoundException | SQLException e) {
            throw new ServletException(e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setCharacterEncoding("UTF-8");
            resp.addHeader("Content-Type", "application/json; charset=utf-8");
            String paramId = req.getParameter("id");
            String name = req.getParameter("name");
            if (paramId != null) {
                Integer id = Integer.parseInt(paramId);
                Discipline discipline = disciplineService.findById(id);
                if (discipline != null) {
                    new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(resp.getOutputStream(), discipline);
                    return;
                } else {
                    resp.setStatus(404);
                }
            } else if (name != null) {
                Discipline discipline = disciplineService.findByName(name);
                if (discipline != null) {
                    new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(resp.getOutputStream(), discipline);
                    return;
                } else {
                    resp.setStatus(404);
                }
            } else {
                List<Discipline> disciplines = disciplineService.findAll();
                new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(resp.getOutputStream(), disciplines);
            }
        } catch (NumberFormatException | SQLException e) {}
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            Discipline discipline = new ObjectMapper().readValue(req.getReader(), Discipline.class);

            disciplineService.create(discipline);
            resp.setStatus(201);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");

            String paramId = req.getParameter("id");
            if (paramId != null) {
                Integer id = Integer.parseInt(paramId);
                Discipline discipline = disciplineService.findById(id);

                if (discipline != null) {
                    disciplineService.delete(id);
                }
            } else {
                resp.setStatus(400);
            }

            resp.setStatus(200);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");

            String paramId = req.getParameter("id");
            Discipline discipline = new ObjectMapper().readValue(req.getReader(), Discipline.class);

            if (paramId != null) {
                Integer id = Integer.parseInt(paramId);
                Discipline existingDiscipline = disciplineService.findById(id);

                if (existingDiscipline != null) {
                    discipline.setId(id);
                    disciplineService.update(discipline);
                    resp.setStatus(200);
                } else {
                    disciplineService.create(discipline);
                    resp.setStatus(201);
                }
            } else {
                resp.setStatus(400);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}