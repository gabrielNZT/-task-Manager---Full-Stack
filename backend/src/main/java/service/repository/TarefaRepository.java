package service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import service.model.Tarefa;


public interface TarefaRepository extends JpaRepository<Tarefa, Long> {}
