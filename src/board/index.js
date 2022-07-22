import Group from "../group/group";
import NewGroup from "../group/newGroup";
import { Container } from './styles.js'

function Board() {

    return (
        <Container>
           
           <Group></Group>
            <Group></Group>
            <NewGroup></NewGroup>
           
        </Container>
    );
}

export default Board;