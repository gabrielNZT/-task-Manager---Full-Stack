import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import DragContext from '../../contexts/dragContext';

const DropWrapper = ({ children, group }) => {

    const { moveItem } = useContext(DragContext);

    const [, drop] = useDrop({
        accept: 'ITEM',
        drop: (item, _) => {
            if (group.cards.length === 0) {
                const draggedIndex = item.index;
                const targetIndex = 0;

                const draggedListIndex = item.parentOrder;
                const targetListIndex = group.index;

                moveItem(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
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