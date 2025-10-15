import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';
import { postRegister } from '../pages/api';


function RegisterForm({setSuccess, setDanger}) {

    const [data, setData] = useState({
        'firstname': null,
        'lastname': null,
        'email': null,
        'password': null
    })
    
    const updateFirstname = (e) => {
        setData({...data,['firstname']: e.target.value})
    }
    
    const updateLastname = (e) => {
        setData({...data,['lastname']: e.target.value})
    }
    
    const updateEmail = (e) => {
        setData({...data,['email']: e.target.value})
    }
    
    const updatePassword = (e) => {
        setData({...data,['password']: e.target.value})
    }

    const RegisterUser = async () => {
        const response = await postRegister(data)
        if (response.status == 'SUCCESS') {
            setSuccess()
            console.log(response)
        } else if (response.status == 'ERROR') {
            setDanger()
            console.log(response)
        }
    }
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder='Enter First Name' onChange={updateFirstname}/>
                    </Form.Group>                 
                </Col>  
                <Col>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder='Enter Last Name' onChange={updateLastname}/>
                    </Form.Group>                     
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address <FontAwesomeIcon icon={faEnvelope} /></Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={updateEmail} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password <FontAwesomeIcon icon={faLock} /></Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={updatePassword}/>
            </Form.Group>
            
            <Button variant="dark" onClick={RegisterUser}>
                Submit
            </Button>
        </Form>
    )
}

export default RegisterForm
