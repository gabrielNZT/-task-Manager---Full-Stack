package service.controller;

import service.entitys.Grupo;
import service.entitys.Tarefa;
import service.exception.NotFoundExcpetion;
import service.repository.GrupoRepository;
import service.repository.TarefaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller{


    private final GrupoRepository grupoRepository;

    private final TarefaRepository tarefaRepository;

    public Controller(GrupoRepository grupoRepository, TarefaRepository tarefaRepository){
        this.tarefaRepository = tarefaRepository;
        this.grupoRepository = grupoRepository;
    }

    @GetMapping("/")
    public String Init(){
        return ("API GERENCIADOR DE TAREFAS");
    }


    /* CRUD GRUPO */
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

    @GetMapping("/grupo/{id}")
    public Grupo findByID(@PathVariable Long id){
        return grupoRepository.findById(id).orElseThrow(() -> new NotFoundExcpetion(id));
    }


    /* CRUD TAREFA */
    @PostMapping("tarefa/{id}")
    public Tarefa newTarefa(@PathVariable Long id, @RequestBody Tarefa tarefa){
       Grupo grupo =  grupoRepository.findById(id).orElseThrow(() -> new NotFoundExcpetion(id));
       tarefa.setGrupo(grupo);
       tarefaRepository.save(tarefa);
       return tarefa;
    }

    @GetMapping("/tarefa")
    public List<Tarefa> findAllTarefas(){
        return (List<Tarefa>) tarefaRepository.findAll();
    }

    @PutMapping("tarefa/{id}/{idGrupo}")
    public Tarefa updateTarefa(@PathVariable Long id, @PathVariable Long idGrupo, @RequestBody Tarefa tarefa){
        Grupo grupo = grupoRepository.findById(idGrupo).orElseThrow(() -> new NotFoundExcpetion(id));

        tarefaRepository.findById(id).map(updateTarefa -> {
           updateTarefa.setDescription(tarefa.getDescription());
           updateTarefa.setIndex(tarefa.getIndex());
           updateTarefa.setTitle(tarefa.getTitle());
           updateTarefa.setGrupo(grupo);
           return tarefaRepository.save(updateTarefa);
        });
        return null;
    }

    @DeleteMapping("/tarefa/{id}")
    void deleteTarefa(@PathVariable Long id){
        tarefaRepository.deleteById(id);
    }

}
