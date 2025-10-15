import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Searchbar({handleSearch}) {
    const [query, setQuery] = useState('')

    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    const searchWrapper = () => {
        handleSearch(query)
    }
    return (
    <InputGroup className="mb-3">
        <Form.Control
            placeholder="Search for problem"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={updateQuery}
        />
        <Button variant="outline-dark" id="button-addon2" onClick={searchWrapper}>
            Search <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
  </InputGroup>)
}

export default Searchbar