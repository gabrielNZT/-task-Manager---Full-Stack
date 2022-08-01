package service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.model.Grupo;
import service.repository.GrupoRepository;
import service.repository.TarefaRepository;

import java.util.List;

@RestController
public class GrupoController {

    @Autowired
    GrupoRepository grupoRepository;

    @PostMapping("/grupo")
    Grupo createGrupo (@RequestBody Grupo newGrupo){
        return grupoRepository.save(newGrupo);
    }

    @GetMapping("/grupo")
    public List<Grupo> findAllGrupo(){
        return (List<Grupo>) grupoRepository.findAll();
    }

    @PutMapping("/grupo")
    Grupo updateGrupo(@RequestBody Grupo newGrupo){
        return grupoRepository.save(newGrupo);
    }

    @DeleteMapping("/grupo/{id}")
    void deleteGrupo(@PathVariable Long id){
        grupoRepository.deleteById(id);
    }
}
