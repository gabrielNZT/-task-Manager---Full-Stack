import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import NewCard from './script';
import CloseBTN from './closeButton';

function Group() {
    return (
        <Card border="dark" style={{ width: '18rem', marginTop: 10, marginLeft: 20}}>
            <Card.Header style={{ background: '#1976d2', color: '#FFFFFF', fontSize: '20px', border: '2px solid black' }}>
                Header
                <CloseBTN></CloseBTN>
                </Card.Header>
            <Card.Body style={{ background: '#e7e7e7', fontSize: '20px' }}>
                <Card body style={{border: '2px solid #795244', marginTop: 15, cursor: 'pointer'}}>Task 1</Card>
                <Card body style={{border: '2px solid #795244', marginTop: 15, cursor: 'pointer'}}>Task 2</Card>
                <Card body style={{border: '2px solid #795244', marginTop: 15, cursor: 'pointer'}}>Task 3</Card>
                <Card body style={{border: '2px solid #795244', marginTop: 15, cursor: 'pointer'}}>Task 4</Card>
                <NewCard></NewCard>
            </Card.Body>
        </Card>
    );
}

export default Group;