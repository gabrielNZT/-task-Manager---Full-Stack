import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import headers from '../../service/security/header';
import api from '../../service/api';

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

                console.log()

                api
                    .put("/api/moveCard/" + item.cardId, {
                        header: item.header,
                        description: item.description,
                        position: targetPosition,
                        grupo: group.id
                    }, { headers: headers() })
                    .then(moveItem(draggedListPosition, targetListPosition, draggedPosition, targetPosition, cardId))
                    .catch(function (error) {
                        console.log(error)
                    })
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