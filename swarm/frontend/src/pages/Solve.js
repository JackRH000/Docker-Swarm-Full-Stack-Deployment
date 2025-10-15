import Container from "react-bootstrap/esm/Container"
import SolutionForm from "../components/solutionForm"
import styles from '../css/solve.module.css'
import appStyles from '../css/app.module.css'
import { useState } from "react"
import Alert from "react-bootstrap/Alert"

function Solve({id}) {

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [show, setShow] = useState(false)

    const assignError = (e, msg) => {
        setError(e)
        setErrorMsg(msg)
        setShow(true)
    }
    
    return (
    <Container> 
        <h1 className={appStyles.header} style={{'margin-top': '5vh'}}>Provide solution to problem</h1>
    <Container className={styles.solutionContainer}>
        <Alert show={show} variant={!error ? 'danger' : 'success'}> 
            <Alert.Heading>{!error ? "Oh no!" : "Successfully uploaded"}</Alert.Heading>
            <p>{errorMsg}</p>
        </Alert>
        <SolutionForm id = {id} assignError={assignError}/>
    </Container>
    </Container>  
    )
}

export default Solve