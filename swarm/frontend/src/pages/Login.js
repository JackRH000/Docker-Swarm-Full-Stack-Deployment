
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert'
import styles from '../css/login.module.css'
import appStyles from '../css/app.module.css'
import LoginForm from '../components/LoginForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';
function Login({getID}) {

    const [status, setStatus] = useState(null)
    const [show, setShow] = useState(false)

    const loginStatus = (response) => {
        setStatus(response)
        setShow(true)
    }
  return (
    <div style={{'margin-top': '15vh'}}>
        <h1 className={appStyles.header}>Login to FixIt <FontAwesomeIcon icon={faRightToBracket} /></h1>
        <Stack gap={4} >
                { status ? 
                <Col xs={5} className='mx-auto'>
                    <Alert show={show} variant={status['success'] ? "success" : "danger"} onClose={() => {setShow(false)}} dismissible>
                        <Alert.Heading>{status['success'] ? "Login Successful" : "Error"}</Alert.Heading>
                        <p className='ml-0'>{status['msg']}</p>
                    </Alert>
                </Col> : ''
                }
                <Col xs={8} className='mx-auto'>
                    <div className={styles.loginContainer}>
                        <LoginForm loginStatus={loginStatus} getID={getID} />
                    </div>
                </Col>
        </Stack>
    </div>
  );
}

export default Login
