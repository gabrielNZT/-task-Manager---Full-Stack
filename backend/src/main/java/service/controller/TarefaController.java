package service.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.model.Grupo;
import service.model.Tarefa;
import service.exception.NotFoundException;
import service.repository.GrupoRepository;
import service.repository.TarefaRepository;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TarefaController {

    @Autowired
    GrupoRepository grupoRepository;
    @Autowired
    TarefaRepository tarefaRepository;

    @PostMapping("/tarefa/{id}")
    public Tarefa newTarefa(@PathVariable Long id, @RequestBody Tarefa tarefa){
        Grupo grupo =  grupoRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
        grupo.getCards().add(tarefa);
        tarefa.setGrupo(grupo);
        tarefaRepository.save(tarefa);
        return tarefa;
    }

    @GetMapping("/tarefa")
    public List<Tarefa> findAllTarefas(){
        return tarefaRepository.findAll();
    }

    @PutMapping("/tarefa/{id}")
    public Tarefa updateTarefa(@PathVariable Long id, @RequestBody Tarefa tarefa){

        tarefaRepository.findById(id).map(updateTarefa -> {
            updateTarefa.setDescription(tarefa.getDescription());
            updateTarefa.setIndex(tarefa.getIndex());
            updateTarefa.setTitle(tarefa.getTitle());
            return tarefaRepository.save(updateTarefa);
        });
        return null;
    }

    @DeleteMapping("/tarefa/{id}")
    void deleteTarefa(@PathVariable Long id){
        tarefaRepository.deleteById(id);
    }
}
