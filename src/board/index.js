import { useState } from "react";
import Group from "../group/group";
import NewGroup from "../group/newGroup";
import { Container } from './styles.js'

function Board() {
   
    const [list, setList] = useState([])

    const addGroup = group => {
        //console.log(group);
        if (!group.header || /^\s*$/.test(group.header)) {
            return; 
        }
        setList(list => [...list, group]);
        //console.log(list);
    }

    const onDeleteGroup =  group => {
        setList(list => list.filter(i => i.id !== group.id));
    }  

    return (
        <Container>

            {
              list.map(group => (<Group key={group.id} group={group} onDeleteGroup={onDeleteGroup}/>))
            }

            <NewGroup onSubmit={addGroup}></NewGroup>

        </Container>
    );
}

export default Board;