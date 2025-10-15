import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function DisplayCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.body}
        </Card.Text>
        <Link to={`/solution/${props['ID']}`}>
        <Button variant="primary">View Solution</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default DisplayCard;
