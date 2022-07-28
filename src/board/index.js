import { useState } from "react";
import Group from "../group/group";
import NewGroup from "../group/newGroup";
import { Container } from './styles.js'
import Context from "./context";
import produce from "immer";

function Board() { 
    const [list, setList] = useState([]) // [{id: string, header: string, children: array }]


    function moveItem(indexList, from, to) {

        setList(produce(list, draft =>{
           
           const dragged = draft[indexList].cards[from];
           
           draft[indexList].cards.splice(from, 1);
           draft[indexList].cards.splice(to, 0, dragged);
        }))
    }

    const addGroup = group => {
        if (!group.header || /^\s*$/.test(group.header)) {
            return; 
        }
        setList(list => [...list, {...group, cards: []}]);
    }

    const onDeleteGroup = group => {
        setList(list => list.filter(i => i.id !== group.id));
    }  

    const onChangeGroup = group => {
        setList(list => list.map(i => i.id === group.id ? {...i, ...group} : i))
        console.log(group);
    }

    return (
        <Context.Provider value={{list, moveItem}}>
        <Container>
            {list.map((group, index) => (<Group key={group.id} group={group} onDelete={onDeleteGroup} index={index} onChange={onChangeGroup}/>))}
            <NewGroup onSubmit={addGroup}/>
        </Container>
        </Context.Provider>
    );
}

export default Board;