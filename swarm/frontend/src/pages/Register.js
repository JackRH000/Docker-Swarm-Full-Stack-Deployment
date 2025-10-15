import RegisterForm from "../components/RegisterForm"
import styles from "../css/login.module.css"
import appStyles from "../css/app.module.css"
import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Badge from "react-bootstrap/Badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser} from "@fortawesome/free-solid-svg-icons"
import AlertMessage from '../components/AlertMessage'
import { useState } from "react"


function Register() {

    const [alert, setAlert] = useState({
        variant: null,
        title: null,
        body: null
    })

    function setDanger() {
        setAlert({
            variant: 'danger',
            title: 'Error submitting',
            body: 'There was an error submitting your request, please try again later'
        })
    }

    function setSuccess() {
        setAlert({
            variant: 'success',
            title: 'Successful registration',
            body: 'You have successfully registered to FixIt'
        })
    }
    return (
        <div style={{'margin-top':'5vh'}}>
            <h1 className={appStyles.header}>Register Account <Badge bg="dark">
                <FontAwesomeIcon icon={faUser} />
                </Badge>
            </h1>
            <Container>
                <Row>
                    <Col></Col>
                    <Col md="8" className={styles.loginContainer}>
                        <RegisterForm setSuccess = {setSuccess} setDanger={setDanger}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className={styles.alert}>
                    <AlertMessage show={alert} variant={alert.variant} title={alert.title} body={alert.body}/>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register