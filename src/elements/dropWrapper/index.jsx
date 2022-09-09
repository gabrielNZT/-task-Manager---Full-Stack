import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

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

                moveItem(draggedListPosition, targetListPosition, draggedPosition, targetPosition, cardId);
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