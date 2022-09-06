import React, { useState, useRef } from 'react';

import DeleteGroupButton from '../deleteGroupButton';
import AddGroupCardButton from '../addGroupCardButton';
import DropWrapper from '../dropWrapper';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'

import GroupCard from '../groupCard';

import { Container } from './styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../service/api';
import headers from '../../service/security/header.js';

const Group = (props) => {
    const { group: { id, title, cards }, dispatch, group } = props;
    const [header, setHeader] = useState(title);


    const headerInputRef = useRef(null);


    const cardStyle = {
        width: '18rem',
        marginTop: 25,
        marginLeft: 30,
    }

    const cardHeaderStyle = {
        background: '#1976d2',
        color: '#FFFFFF',
        fontSize: '26px',
        border: '2px solid black',
        display: 'flex',
        position: 'relative',
        minHeight: '4rem',
        height: 'fit-content'
    }

    const formControlStyle = {
        background: '#1976d2',
        border: 'transparent',
        fontSize: '20px',
        color: '#FFF'
    }

    const cardBodyStyle = {
        background: '#e7e7e7',
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column'
    }


    const handleTitleUpdate = () => {
        if (header !== title) {
            api
            .put("/api/grupo/"+id, {
                position: group.index,
                header: header
            }, {headers: headers()})
            .then();
            dispatch({ type: 'UPDATE_GROUP_TITLE', payload: { id, title: header } })
        }
    }

    const handleChangeTitle = (e) => {
        setHeader(e.target.value);
    }

    const handleDelete = () => {
        dispatch({
            type: 'SHOW_MODAL', payload: {
                modal: 'DELETE_GROUP',
                current: props.group,
            }
        })
    }

    const handleClickAdd = () => {
        dispatch({
            type: 'SHOW_MODAL', payload: {
                modal: 'CREATE_GROUP_CARD',
                current: props.group,
            }
        })
    }



    return <Container>
        <DropWrapper group={group}>
            <Card border="dark" style={cardStyle} >
                <Card.Header style={cardHeaderStyle}>
                    <Form
                    >
                        <Form.Label>
                            <Form.Control style={formControlStyle} id={id}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        headerInputRef.current.blur()
                                    }
                                }}
                                onChange={handleChangeTitle}
                                onBlur={handleTitleUpdate}
                                ref={headerInputRef}
                                required
                                type='text'
                                value={header}
                            />
                        </Form.Label>
                    </Form>
                    <DeleteGroupButton onClick={handleDelete} />
                </Card.Header>
                <Card.Body id='card-body' style={cardBodyStyle}>
                    {cards.sort((a, b) => a.index - b.index).map((card) => (<GroupCard key={card.id} card={card} parent={group} dispatch={dispatch} />))}
                    <AddGroupCardButton onClick={handleClickAdd} />
                </Card.Body>
            </Card>
        </DropWrapper>
    </Container >;
}

export default Group;