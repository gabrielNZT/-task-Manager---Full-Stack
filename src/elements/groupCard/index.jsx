import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import DragContext from '../../contexts/dragContext';

import { Container } from './styles';


const GroupCard = (props) => {
    const { parent, dispatch, card } = props;
    const { title } = card;


    const cardRef = useRef(null);

    const { moveItem } = useContext(DragContext);

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(item, monitor) {

            if (!cardRef.current) {
                return;
            }
            
            const draggedIndex = item.index;
            const targetIndex = card.index;

            const draggedListIndex = item.parentOrder;
            const targetListIndex = parent.index;


            if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
                return;
            }

            const hoveredRect = cardRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (draggedIndex < targetIndex && hoverMiddleY < hoverClientY) {
                return;
            }

            if (draggedIndex > targetIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            const idGroup = parent.id;
            const idCard = item.cardId;

            moveItem(draggedListIndex, targetListIndex, draggedIndex, targetIndex, idGroup, idCard);
            item.index = targetIndex;
            item.parentOrder = targetListIndex;
            
        }
    })


    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { index: card.index, parentOrder: parent.index, parentCardsLength: parent.cards.length, cardId: card.id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });



    drag(drop(cardRef));

    const onClick = () => {
        dispatch({ type: 'SHOW_MODAL', payload: { modal: 'EDIT_GROUP_CARD', current: card } })
    }
    return <Container ref={cardRef} onClick={onClick} isDragging={isDragging}>
        <h1>{title}</h1>
    </Container>;
}

export default GroupCard;