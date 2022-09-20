import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './style.css'
import moment from 'moment';
import 'moment/locale/pt-br'

function Historic(props) {
  const {historyList} = props
  
  return (
    <Card style={{ width: 'max-content'  }}>
      <Card.Header className='title-historic'>Histórico</Card.Header>
      <ListGroup variant="flush" className='body-historic'>
      {historyList.map(element =>(<ListGroup.Item key={element.id}>{element.user.username} atualizou em {moment(element.date).locale("pt-br").format('LLL')}</ListGroup.Item>) )}
      </ListGroup>
    </Card>
  );
}

export default Historic;