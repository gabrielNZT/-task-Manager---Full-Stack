package service.exception;

public class NotFoundExcpetion extends RuntimeException{
    public NotFoundExcpetion(Long id){
        super("could not find the id: "+id);
    }
}
