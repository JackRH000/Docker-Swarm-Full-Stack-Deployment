import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DisplayCard from '../components/Card';
import styles from '../css/home.module.css';
import Searchbar from '../components/Searchbar';
import appStyles from '../css/app.module.css'
import { fetchResults, postSearch } from './api';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
function Home() {

    const [data, setData] = useState(null)
    const [option, setOption] = useState(null)

    const handleSearch = async (s) => {
        const data = await postSearch(s,option)
        setData(data)
        console.log(data)
    }


    const rows = [1, 2, 3]
    const cols = [1,2,3]
    return (
        <div className={appStyles.container}>
        <Container>
            <h1 className={appStyles.header}>Welcome to FixIt</h1>
            <p style={{'text-align': 'center'}}>{'Search for problems, Share your solutions :)'}</p> 
            <div>
                <Searchbar handleSearch={handleSearch}/>
                <Form.Select className='bg-secondary text-light' aria-label="Default select example" onChange={(e) => {setOption(e.target.value)}}>
                    <option>Select a problem Category</option>
                    <option value="1">Technology</option>
                    <option value="2">Automobiles</option>
                    <option value="3">House Maintenance</option>
                </Form.Select>
            </div> 

            <div className={styles['cardRow']}>
                <Row className='mx-auto'>
                    {data ? data['results'].map((entry) => {
                        return (
                            <Col className='mx-auto'>
                                < DisplayCard ID={entry['id']} title={entry['title']} body={entry['description']}/>
                            </Col>
                        )
                    }) : ''}
                </Row>
            </div>
      </Container>
      </div>
    )
}

export default Home;