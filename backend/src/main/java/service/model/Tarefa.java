package service.model;

import javax.persistence.*;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer index;
    private String title;
    private String description;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grupo_id", referencedColumnName = "id")
    private Grupo grupo = new Grupo();

    public Tarefa(Integer index, String title, String description, Grupo grupo ) {
        this.index = index;
        this.title = title;
        this.description = description;
        this.grupo = grupo;
    }

    public Tarefa() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    @Override
    public String toString() {
        return "Tarefas{" +
                "id=" + id +
                ", index=" + index +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
