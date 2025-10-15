import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { Navigate } from 'react-router-dom'
import { postSolution } from '../pages/api'
function SolutionForm({id, assignError}) {

    const [solution, setSolution] = useState({
        'title': null,
        'solver_id': id,
        'type': null,
        'description': null,
        'detailed': null
    })

    const submit = async () => {
        const result =  await postSolution(solution)
        assignError(result['success'], result['msg'])
    }
    return id ? (
        <Form className='text-light bg-primary'>
            <Form.Group className="mb-3" controlId="problemTitle">
            <Form.Label>Title of problem</Form.Label>
            <Form.Control type="text" className='bg-light' placeholder="Example: Black smoke from exhaust" 
                onChange={(e) => setSolution({...solution,['title']: e.target.value})}
            />
            </Form.Group>
            <Form.Group className='mb-3' controlId='problemType'>
                <Form.Label>Type of Problem</Form.Label>
                <br></br>
                <Form.Select aria-label="Default select example" className='bg-light text-dark'
                    onChange={(e) => setSolution({...solution,['type']: e.target.value})}
                >
                    <option>Select problem type</option>
                    <option value="1">Technology</option>
                    <option value="2">Automobile</option>
                    <option value="3">Home Maintenance</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="problemBreif">
            <Form.Label>Breif Description of Problem</Form.Label>
            <Form.Control type="text" placeholder="Description (<150 chars)" maxLength={150} 
                onChange={(e) => setSolution({...solution,['description']: e.target.value})}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Soltion to Problem</Form.Label>
            <Form.Control as="textarea" rows={3} 
                onChange={(e) => setSolution({...solution,['detailed']: e.target.value})}
            />
            </Form.Group>
            <Button onClick={submit} variant='light'>Submit</Button>
        </Form>
    ) : <Navigate to="/" />
}

export default SolutionForm