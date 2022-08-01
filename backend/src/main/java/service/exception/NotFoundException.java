package service.exception;

public class NotFoundException extends RuntimeException{
    public NotFoundException(Long id){
        super("could not find the id: "+id);
    }
}
