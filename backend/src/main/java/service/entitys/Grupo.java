package service.entitys;

import javax.persistence.*;
import java.util.List;

@Entity
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private Integer index;
    @OneToMany
    private List<Tarefa> cards;

    public Grupo(String title, Integer index, List<Tarefa> cards) {
        this.cards = cards;
        this.title = title;
        this.index = index;
        this.id = id;
    }

    public Grupo() {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrder() {
        return index;
    }

    public void setOrder(Integer order) {
        this.index = order;
    }

    @Override
    public String toString() {
        return "Grupo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", index=" + index +
                ", cards=" + cards +
                '}';
    }
}
