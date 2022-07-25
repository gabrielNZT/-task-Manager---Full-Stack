import { useState } from "react";
import Group from "../group/group";
import NewGroup from "../group/newGroup";
import { Container } from './styles.js'

function Board() { 
    const [list, setList] = useState([]) // [{id: string, header: string, children: array }]

    const addGroup = group => {
        if (!group.header || /^\s*$/.test(group.header)) {
            return; 
        }
        setList(list => [...list, {...group, tasks: []}]);
    }

    const onDeleteGroup = group => {
        setList(list => list.filter(i => i.id !== group.id));
    }  

    const onChangeGroup = group => {
        setList(list => list.map(i => i.id === group.id ? {...i, ...group} : i))
    }

    return (
        <Container>
            {list.map(group => (<Group key={group.id} group={group} onDelete={onDeleteGroup} onChange={onChangeGroup}/>))}
            <NewGroup onSubmit={addGroup}/>
        </Container>
    );
}

export default Board;