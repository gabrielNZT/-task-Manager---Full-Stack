import React, { useEffect, useReducer, useState} from "react";
import GroupList from './groupList';
import { DeleteGroupModal, EditGroupCardModal, CreateGroupCardModal, CreateGroupModal } from './modal';
import DragContext from '../contexts/dragContext';
import { reducer } from './reducer';
import { Container } from "./styles";
import api from "../service/api"



const Board = () => {

    const [state, dispatch] = useReducer(reducer, { groups: [], status: 'idle' });
    const [isChange, setIsChange] = useState(false);
    const [id, setID] = useState(null);
    const [title, setTitle] = useState(null);
    const [index, setIndex] = useState(null);
    const [indexGroup, setIndexGroup] = useState(null);
    
    useEffect(() => {
        api
        .get("/grupo")
        .then((response) => dispatch({type: 'FETCH_DATA', payload: response.data}))
        .catch((err) => {
            console.log(err);
        })
    }, []);

    if(isChange === true){
    
        api
        .put("grupo/"+id, {
            id: id,
            title: title,
            index: index,
            cards: state.groups[indexGroup].cards
        })
        .then();
        setIsChange(false);
    }

    const moveCardItem = (fromList, toList, from, to) => {
        setIsChange(true);
        setID(state.groups[toList].id);
        setIndex(state.groups[toList].index);
        setTitle(state.groups[toList].title);
        setIndexGroup(toList);
        dispatch({ type: 'MOVE_ITEM', payload: { fromList, toList, from, to } });
    }

    return (
        <>
            <CreateGroupModal visible={state.modal === 'CREATE_GROUP'} dispatch={dispatch} state={state} />
            <CreateGroupCardModal visible={state.modal === 'CREATE_GROUP_CARD'} dispatch={dispatch} state={state} />
            <EditGroupCardModal visible={state.modal === 'EDIT_GROUP_CARD'} dispatch={dispatch} state={state} />
            <DeleteGroupModal visible={state.modal === 'DELETE_GROUP'} dispatch={dispatch} state={state} />
            <DragContext.Provider value={{ list: state.groups, moveItem: moveCardItem }}>
                <Container>
                    <GroupList state={state} dispatch={dispatch} />
                </Container>
            </DragContext.Provider>

        </>
    )
}

export default Board;