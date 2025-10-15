import { SOLUTIONS_URL, LOGIN_URL } from "../const"

export const fetchResults = async() => {
    console.log(`The solution API is ${SOLUTIONS_URL}`)	
    const response = await fetch(`http://${SOLUTIONS_URL}:3000/`)
    const data = await response.json()
    return data
}

export const postSearch = async(title, option) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'title': title,
            'type': option
        })
    };

    console.log(`The solution API is ${SOLUTIONS_URL}`)	
    const response = await fetch(`http://${SOLUTIONS_URL}:3000/`,requestOptions)
    console.log(`Got here..`)	
    const results = await response.json()
    return  results
}

export const postLogin = async(email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'email': email,
            'password': password
        })
    };

    const response = await fetch(`http://${LOGIN_URL}:3003/login`,requestOptions)
    const results = await response.json()
    return  results
}

export const postRegister = async(data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'firstname': data['firstname'],
            'lastname': data['lastname'],
            'email': data['email'],
            'password': data['password']
        })
    };

    const response = await fetch(`http://${LOGIN_URL}:3003/register`,requestOptions)
    const results = await response.json()
    return  results
}

export const postSolution = async(data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'title': data['title'],
            'solver_id': data['solver_id'],
            'type': data['type'],
            'description': data['description'],
            'detailed': data['detailed']
        })
    };

    const response = await fetch(`http://${SOLUTIONS_URL}:3000/submit`, requestOptions)
    const results = await response.json()
    return results
}

export const getSolution = async (id) => {
    const response = await fetch(`http://${SOLUTIONS_URL}:3000/solution/${id}`)
    const result = await response.json()
    return result
}

export const updateRating = async (id, rating) => {
    const response = await fetch(`http://${SOLUTIONS_URL}:3000/update/${id}/${rating}`)
    const result = await response.json()
    return result
}
