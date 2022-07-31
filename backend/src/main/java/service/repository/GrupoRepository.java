package service.repository;

import service.entitys.Grupo;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface GrupoRepository extends CrudRepository <Grupo, Long> {
   Optional<Grupo> findById(Long id);
}
