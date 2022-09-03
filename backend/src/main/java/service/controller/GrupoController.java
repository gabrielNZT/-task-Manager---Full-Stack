package service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import service.model.Grupo;
import service.model.Tarefa;
import service.repository.GrupoRepository;
import service.repository.TarefaRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class GrupoController {

    @Autowired
    GrupoRepository grupoRepository;

    @Autowired
    TarefaRepository tarefaRepository;

    @PostMapping("/grupo")
    Grupo createGrupo (@RequestBody Grupo newGrupo){
        return grupoRepository.save(newGrupo);
    }

    @PutMapping("/grupo/{id}")
    Grupo moveCard (@PathVariable Long id, @RequestBody Grupo updateGrupo){
      
     List<Tarefa> cardlist = updateGrupo.getCards();
     Grupo grupo = grupoRepository.getById(id);

     for(Tarefa card: cardlist){
        card.setGrupo(grupo);
        tarefaRepository.save(card);
     }
      
     grupoRepository.save(grupo);
      return grupo;
    }

    @GetMapping("/grupo")
    public List<Grupo> findAllGrupo(){
        return (List<Grupo>) grupoRepository.findAll();
    }

    @DeleteMapping("/grupo/{id}")
    void deleteGrupo(@PathVariable Long id){
        grupoRepository.deleteById(id);
    }
}
