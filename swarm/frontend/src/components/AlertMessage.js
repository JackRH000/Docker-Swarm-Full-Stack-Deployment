import Alert from 'react-bootstrap/Alert';

function AlertMessage({show, variant, title, body}) {
    return (
        <Alert variant={variant} show={show}>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{body}</p>
      </Alert>
    )
}

export default AlertMessage