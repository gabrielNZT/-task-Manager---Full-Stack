package service.repository;

import service.entitys.Grupo;
import service.entitys.Tarefa;
import org.springframework.data.repository.CrudRepository;

import java.util.Iterator;
import java.util.Optional;

public interface TarefaRepository extends CrudRepository<Tarefa, Long> {
Iterator <Tarefa> findByGrupo(Grupo grupo);

    Optional<Tarefa> findById(Long id);
}
