import React, { useEffect, useReducer } from "react";
import GroupList from './groupList';
import { DeleteGroupModal, EditGroupCardModal, CreateGroupCardModal, CreateGroupModal } from './modal';
import DragContext from '../contexts/dragContext';
import { reducer } from './reducer';
import { Container } from "./styles";
import { getGroups, currentUser } from "../service/requests.js"
import { useState } from "react";
import Spin from '../spin/spinner.js'
import AppBar from "./appbar";
import ModalNotification from "./modal/notification/modal";
import Notify from './modal/notification/error';
import { useNavigate } from 'react-router-dom';

const Board = () => {

    const [state, dispatch] = useReducer(reducer, { groups: [], status: 'idle' });
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate()

    function GoToHome() {
        Notify('INVALIDE_ROUTE');
        navigate('../', { replace: true })
    }

    async function setGroups() {
        await getGroups().then((response) => {
            dispatch({ type: 'FETCH_DATA', payload: response.data })
            setLoading(false)
        }).catch(() => GoToHome())
    }

    useEffect(() => {
        setLoading(true);
        currentUser()
        setGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const moveCardItem = (fromList, toList, from, to) => {
        dispatch({ type: 'MOVE_ITEM', payload: { fromList, toList, from, to } });
    }

    return (
        <>
            <CreateGroupModal visible={state.modal === 'CREATE_GROUP'} dispatch={dispatch} state={state} />
            <CreateGroupCardModal visible={state.modal === 'CREATE_GROUP_CARD'} dispatch={dispatch} state={state} />
            <EditGroupCardModal visible={state.modal === 'EDIT_GROUP_CARD'} dispatch={dispatch} state={state} />
            <DeleteGroupModal visible={state.modal === 'DELETE_GROUP'} dispatch={dispatch} state={state} />
            <ModalNotification visible={state.modal === 'NOTIFICATION'} dispatch={dispatch} state={state} />
            <DragContext.Provider value={{ list: state.groups, moveItem: moveCardItem }}>
                <AppBar state={state} dispatch={dispatch} />
                <Container>
                    <GroupList state={state} dispatch={dispatch} />
                    {loading ? (<Spin />) : null}
                </Container>
            </DragContext.Provider>

        </>
    )
}

export default Board;