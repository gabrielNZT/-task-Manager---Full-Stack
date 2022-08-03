package service.model;



import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private Integer index;


    @OneToMany(mappedBy = "grupo", orphanRemoval = true)
    private List<Tarefa> cards = new ArrayList<>();

    public Grupo(String title, Integer index, List<Tarefa> cards) {
        this.cards = cards;
        this.title = title;
        this.index = index;
    }

    public Grupo() {
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

    public List<Tarefa> getCards() {
        return cards;
    }

    public void setCards(List<Tarefa> cards) {
        this.cards = cards;
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
