import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import NewCard from './newCard';
import CloseBTN from './closeButton';
import { Container } from './style';
import Form from 'react-bootstrap/Form'
import { useState} from 'react';
import Task from '../card/index.js';


function Group(props) {
    const { group, onDelete, onChange, index } = props;
    const [header, setHeader] = useState(group.header);
    const [cards, setCards] = useState(group.cards || []);
    const listIndex = index

    
    const addCard = task => {
        if (!task.name || /^\s*$/.test(task.name)) {
            return; 
        }
        setCards([...cards, task]);
    }

    const handleOnChange = e => {
        setHeader(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        var value = document.getElementById(group.id);
        value.blur();
        onChange({header, cards});
    }


    const onEditCard = item => {
        setCards(cards.map(i => {
            if (item.id === i.id) {
               return item;
            }
            return i;
        }))
    }


    const onDeleteCard = item => {
        setCards(cards.filter(i => i.id !== item.id))
    }

    const cardStyle = {
        width: '18rem', 
        marginTop: 20, 
        marginLeft: 30
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

    return (
        <Container>
            <Card border="dark" style={cardStyle}>
                
                <Card.Header style={cardHeaderStyle}>  
                     <Form onSubmit={handleSubmit} >
                        <Form.Label>
                            <Form.Control style={formControlStyle} id={group.id}
                            
                            onChange={handleOnChange}
                            required
                            type='text'
                            value={header}
                            />
                        </Form.Label>
                     </Form>
                    
                    <CloseBTN onClick={() => onDelete(group)}/>
                </Card.Header>

                <Card.Body id='card-body' style={cardBodyStyle}>
                    {cards.map((item, index) => (<Task key={item.id} item={item} onEdit={onEditCard} onDelete={onDeleteCard} index={index} listIndex={listIndex}/>))}
                    <NewCard onSubmit={addCard} />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Group;