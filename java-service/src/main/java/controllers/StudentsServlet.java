package controllers;

import entities.Student;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.StudentsService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/students")
public class StudentsServlet extends HttpServlet {
    StudentsService studentsService;

    @Override
    public void init() throws ServletException {
        try {
            String user = System.getenv("DB_USER");
            String password = System.getenv("DB_PASSWORD");
            String connectionString = System.getenv("DB_CONNECTION_STRING");
            String driver = System.getenv("DB_DRIVER");

            this.studentsService = new StudentsService(
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
            System.out.println("here");
            resp.setCharacterEncoding("UTF-8");
            resp.addHeader("Content-Type", "application/json; charset=utf-8");
            String paramId = req.getParameter("id");
            if (paramId != null) {
                Integer id = Integer.parseInt(paramId);
                Student student = studentsService.findById(id);
                if (student != null) {
                    new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(resp.getOutputStream(), student);
                } else {
                    resp.setStatus(404);
                }
            } else {
                List<Student> students = null;
                System.out.println(students);
                students = studentsService.findAll();
                new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT).writeValue(resp.getOutputStream(), students);
            }
        } catch (NumberFormatException | SQLException e) {}
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            Student student = new ObjectMapper().readValue(req.getReader(), Student.class);
            if (student.getGroupId() != null) {
                System.out.println(student);
                studentsService.create(student);
                resp.setStatus(201);
            } else {
                resp.setStatus(400);
            }
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
                Student student = studentsService.findById(id);

                if (student != null) {
                    System.out.println(id);
                    System.out.println(student);
                    studentsService.delete(id);
                }
            } else {
                resp.setStatus(400);
            }

            resp.setStatus(200);
        } catch (SQLException e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");

            String paramId = req.getParameter("id");
            Student student = new ObjectMapper().readValue(req.getReader(), Student.class);

            if (paramId != null) {
                Integer id = Integer.parseInt(paramId);
                Student existingUser = studentsService.findById(id);

                if (existingUser != null) {
                    student.setId(id);
                    studentsService.update(student);
                    resp.setStatus(200);
                } else {
                    studentsService.create(student);
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