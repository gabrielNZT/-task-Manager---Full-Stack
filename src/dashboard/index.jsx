import React, { useEffect, useReducer, useState} from "react";
import GroupList from './groupList';
import { DeleteGroupModal, EditGroupCardModal, CreateGroupCardModal, CreateGroupModal } from './modal';
import DragContext from '../contexts/dragContext';
import { reducer } from './reducer';
import { Container } from "./styles";
import api from "../service/api"
import headers from '../service/security/header'
import { currentUser } from "../service/security/auth.js";

const Board = () => {

    const [state, dispatch] = useReducer(reducer, { groups: [], status: 'idle' });
    const [isChange, setIsChange] = useState(false);
    const [indexToGroup, setIndexToGroup] = useState(null);
    const [indexFromGroup, setIndexFromGroup] = useState(null);

    useEffect(() => {
        api
        .get("/api/grupo", {headers: headers()})
        .then((response) => dispatch({type: 'FETCH_DATA', payload: response.data}))
        .catch((err) => {
            console.log(err);
        });
        
        currentUser();
    }, []);

    if(isChange === true){

        console.log(state.groups[indexToGroup])
        
         api
        .put("/api/grupo/"+state.groups[indexToGroup].id, {
            header: state.groups[indexToGroup].title,
            position: state.groups[indexToGroup].index,
            cards: state.groups[indexToGroup].cards
        }, {headers: headers()})
        .then();

        console.log(state.groups[indexFromGroup])
        api
        .put("/api/grupo/"+state.groups[indexFromGroup].id, {
            header: state.groups[indexFromGroup].title,
            position: state.groups[indexFromGroup].index,
            cards: state.groups[indexFromGroup].cards
        }, {headers: headers()})
        .then(); 
        
        setIsChange(false);
    }

    const moveCardItem = (fromList, toList, from, to) => {
        setIsChange(true);
        setIndexToGroup(toList);
        setIndexFromGroup(fromList);
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