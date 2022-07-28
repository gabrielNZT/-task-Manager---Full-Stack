import { useEffect } from "react";
import { Container } from "./styles";


const Board = () => {
    return (
        <Container>
            {list.map((group, index) => (<Group key={group.id} group={group} onDelete={onDeleteGroup} index={index} onChange={onChangeGroup} />))}
            <NewGroup onSubmit={addGroup} />
        </Container>
    )
}

export default Board;