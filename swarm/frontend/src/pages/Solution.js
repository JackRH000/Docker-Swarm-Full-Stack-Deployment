import Stack from "react-bootstrap/esm/Stack";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import OffcanvasBody from "react-bootstrap/esm/OffcanvasBody";
import OffcanvasHeader from "react-bootstrap/esm/OffcanvasHeader";
import Badge from "react-bootstrap/Badge";
import { Link, useParams } from "react-router-dom";
import { getSolution, updateRating } from "./api";

function Solution() {

    const {solution_id} = useParams()
    const [solution, setSolution] = useState(null)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rating, setRating] = useState(50)

    const [submit, setSubmit] = useState(false)

    const [color, setColor] = useState('warning')

    const badgeColour = () => {
        if (rating < 40) {
            setColor("danger")
        } else if (rating >= 40 && rating < 70) {
            setColor("warning")
        } else {
            setColor("success")
        }
    }

    const calculate_likes = () => {
        if (solution['rating_count'] === 0) {
            return 'N/A'
        }
        return solution['rating_total'] / solution['rating_count']
    }

    const like_colour = (likes) => {
        if (likes === 'N/A') {
            return 'secondary'
        } else if (likes < 40) {
            return 'danger'
        } else if (likes >= 40 && likes < 70) {
            return 'warning'
        } else if (likes >= 70) {
            return 'success'
        }
    }

    const submitRating = async () => {
        const results = await updateRating(solution_id, rating)
	console.log("Done")
        if (results['success']) {
            console.log('rating submitted successfully. Thank You!')
        } else {
            console.log('failed to update rating')
        }

        setSubmit(true)
    }

    useEffect(() => {
        const retrieveSolution = async () => {
            console.log(solution_id)
            const results = await getSolution(solution_id)
            setSolution(results['results'])
            console.log(solution)
            setLoading(false)
        }
        retrieveSolution()
    },[solution, solution_id])

    return !loading ? (
        <Container style={{'margin-top': '2vh'}}>
            <Stack gap={4}>
                <Col cs={2}>
                    <label>Exit &nbsp;</label> 
                    <Link to="/">
                    <Button variant="dark"><FontAwesomeIcon icon={faDoorOpen} /></Button>
                    </Link>
                </Col>
                <InputGroup>
                <InputGroup.Text><strong>Problem</strong></InputGroup.Text>
                <Form.Control size='lg' disabled readOnly placeholder={solution['title']} />
                <Button variant={like_colour(calculate_likes())} disabled style={{'margin-left': '2%'}}> {calculate_likes()} <FontAwesomeIcon icon={faThumbsUp} /></Button>
                </InputGroup>
                <div>
                    <Form.Label><strong>Breif Description</strong></Form.Label>
                    <Form.Control as="textarea" disabled readOnly>
                    {solution['description']}
                    </Form.Control>
                </div>
                <div>
                    <Form.Label><strong>How to Solve</strong></Form.Label>
                    <Form.Control as="textarea" style={{'height': '200px'}} disabled readOnly>
                    {solution['detailed_solution']}

                    </Form.Control>
                </div>
                <div className="mx-auto">
                    <Button onClick={handleShow}>Add Feedback</Button>
                    <Offcanvas show={show} data-bs-theme="dark" onHide={handleClose} placement='top' style={{'height': 'fit-content'}}>
                        <OffcanvasHeader closeButton><strong>How Helpful was this solution?</strong></OffcanvasHeader>
                        <OffcanvasBody>
                        <Form.Range 
                        min={0} 
                        max={100} 
                        disabled={submit}
                        onChange={(e) => {
                            setRating(e.target.value)
                            badgeColour()
                            }}
                        >

                            </Form.Range>
                        <div>
                        <label>Rating: </label> <Badge size="lg" bg={color}>{rating}</Badge>
                        <Button disabled={submit} style={{'margin-left': '2%'}} onClick={submitRating}>Submit feedback</Button>
                        </div>
                        </OffcanvasBody>
                    </Offcanvas>
                </div>
            </Stack>
        </Container>
    ) : (
        <Container style={{'margin-top': '2vh'}}>
            <Stack gap={4}>
                <Col cs={2}>
                    <label>Exit &nbsp;</label> 
                    <Link to="/">
                    <Button variant="dark"><FontAwesomeIcon icon={faDoorOpen} /></Button>
                    </Link>
                </Col>
                <Spinner animation="border" variant="primary" className="mx-auto" />
            </Stack>
        </Container>     
    )
}


export default Solution
