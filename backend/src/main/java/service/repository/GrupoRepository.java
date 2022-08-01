package service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import service.model.Grupo;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {}
