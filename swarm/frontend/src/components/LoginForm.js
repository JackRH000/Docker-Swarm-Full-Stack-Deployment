import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { postLogin } from '../pages/api';

function LoginForm({loginStatus, getID}) {

    const [email, setEmail] = useState(null)

    const typingEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState(null)

    const typingPassword = (e) => {
        setPassword(e.target.value)
    }

    const submitForm = async () => {
        const results = await postLogin(email, password)
        loginStatus(results)
	console.log(results)    
        getID(results['id'])
    }
    return (
        <Col>
        <Form className='bg-primary text-light'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={typingEmail} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
	    	    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={typingPassword} />
                </Form.Group>
                <Button variant="dark" onClick={submitForm}>
                    Submit
                </Button> <label>or</label>
                <Link to="/register">
                    <Button variant="light" style={{'margin-left': '10px'}}>
                        Register
                    </Button>
                </Link>
            </Form>
            </Col>
    )
}
export default LoginForm
