import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { moveCard } from '../../service/requests.js';

import DragContext from '../../contexts/dragContext';

const DropWrapper = ({ children, group }) => {

    const { moveItem } = useContext(DragContext);

    const [, drop] = useDrop({
        accept: 'ITEM',
        drop: (item, _) => {
            if (group.cards.length === 0) {
                const draggedPosition = item.position;
                const targetPosition = 0;

                const draggedListPosition = item.parentOrder;
                const targetListPosition = group.position;

                const cardId = item.cardId

                const card = {
                    id: item.cardId,
                    header: item.header,
                    description: item.description,
                    position: targetPosition,
                    group: group.id
                }

                moveCard(card).then(moveItem(draggedListPosition, targetListPosition, draggedPosition, targetPosition, cardId));
            }

        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    })
    return <div ref={drop}>
        {children}
    </div>
}

export default DropWrapper;