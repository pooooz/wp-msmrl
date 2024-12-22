package entities;

import java.io.Serializable;

public class Discipline extends Entity implements Serializable {
    private String name;
    private DisciplineControlForm controlForm;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public DisciplineControlForm getControlForm() {
        return controlForm;
    }
    public void setControlForm(DisciplineControlForm controlForm) {
        this.controlForm = controlForm;
    }
}
