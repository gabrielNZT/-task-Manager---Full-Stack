import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import DragContext from '../../contexts/dragContext';
import api from '../../service/api';
import headers from '../../service/security/header';

import { Container } from './styles';


const GroupCard = (props) => {
    const { parent, dispatch, card } = props;
    const { header } = card;


    const cardRef = useRef(null);

    const { moveItem } = useContext(DragContext);

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover (item, monitor) {

            if (!cardRef.current) {
                return;
            }
            
            const draggedIndex = item.position;
            const targetIndex = card.position;

            const draggedListIndex = item.parentOrder;
            const targetListIndex = parent.position;

            if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
                return;
            }

            const hoveredRect = cardRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            // move down
            if (draggedIndex < targetIndex && hoverMiddleY < hoverClientY) {
                return;
            }
            // move up
            if (draggedIndex > targetIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            const idCard = item.cardId;

            moveItem(draggedListIndex, targetListIndex, draggedIndex, targetIndex, idCard);
            item.position = targetIndex;
            item.parentOrder = targetListIndex;
        },
        drop (item, monitor) {
            api
            .put("/api/moveCard/"+card.id, {
                header: card.header,
                description: card.description,
                position: item.position,
                grupo: parent.id
            }, {headers: headers()})
            .then()
            .catch(function (error) {
                console.log(error)
            })
        }
    })


    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { position: card.position, parentOrder: parent.position, parentCardsLength: parent.cards.length, cardId: card.id, grouId: parent.id, header: card.header, description: card.description },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });



    drag(drop(cardRef));

    const onClick = () => {
        dispatch({ type: 'SHOW_MODAL', payload: { modal: 'EDIT_GROUP_CARD', current: card } })
    }
    return <Container ref={cardRef} onClick={onClick} isDragging={isDragging}>
        <h1>{header}</h1>
    </Container>;
}

export default GroupCard;