import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import NewCard from './newCard';
import CloseBTN from './closeButton';
import { Container } from './style';
import Form from 'react-bootstrap/Form'
import { useState} from 'react';
import Task from '../card/index.js';


function Group(props) {
    const { group, onDelete, onChange } = props;
    const [header, setHeader] = useState(group.header);
    const [cards, setCards] = useState(group.cards || []);
    
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

    return (
        <Container>
            <Card border="dark" style={{ width: '18rem', marginTop: 20, marginLeft: 30, }}>
                
                <Card.Header style={{ background: '#1976d2', color: '#FFFFFF', fontSize: '26px', border: '2px solid black', display: 'flex', position: 'relative', height: 55 }}>  
                     <Form onSubmit={handleSubmit} >
                        <Form.Label>
                            <Form.Control style={{background: '#1976d2', border: 'transparent', fontSize: '20px', color: '#FFF'}} id={group.id}
                            
                            onChange={handleOnChange}
                            required
                            type='text'
                            value={header}
                            />
                        </Form.Label>
                     </Form>
                    
                    <CloseBTN onClick={() => onDelete(group)}/>
                </Card.Header>

                <Card.Body id='card-body' style={{ background: '#e7e7e7', fontSize: '20px', display: 'flex', flexDirection: 'column' }}>
                    {cards.map(item => (<Task key={item.id} item={item} onEdit={onEditCard} onDelete={onDeleteCard} />))}
                    <NewCard onSubmit={addCard}/>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Group;