const express = require('express')
const cors = require("cors");
const mysql = require("mysql2")
const bodyParser = require('body-parser')


const app = express()

const ENCRYPT_URL = `http://${process.env.ENCRYPT_HOST_IP}:3002`

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

let connection = null

function get_connection() {

    connection = mysql.createConnection ({
        host: 'db',
        user: 'root',
        password: 'password',
        database: 'fixit_db' // Use the name of the database you created
    });  
    connection.connect((err) => {
        if (err) {
            console.log(err)
            return;
        } else {
            console.log("Connection made")
	}
    })
}	    


app.post('/login', (req, res) => {
	
	get_connection()
        const getLogin = async () => {
            let SQL = `SELECT idusers, email, password FROM users WHERE email = '${req.body.email}'`
            connection.query(SQL, async function(err,results) {
                
                if (err) {
                    res.send({
                        success: false,
                        msg: "Could not connect to database. Please try again later",
                        id: null
                    })
                } else {
                    if (results.length == 0) {
                        res.send({
                            success: false,
                            msg: "Incorrect email. Please try again",
                            id: null
                        })
                        return
                    }
                    const hash = results[0]['password']
                    console.log(req.body)
                    console.log(req.body.password)
                    
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            'phrase': req.body.password,
                            'hash': hash
                        })
                    };

                    const response = await fetch(ENCRYPT_URL + '/compare', requestOptions)	
                    let status = await response.json()
		    console.log(status)	
                    status['id'] = results[0]['idusers']
                    
                    res.send(status)
                }
            })
        }

        getLogin()    
    
})

app.post('/register', (req, res) => {
	
	get_connection()
        const insert = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    'phrase': req.body.password
                })
            };
            const response = await fetch(ENCRYPT_URL + '/encrypt', requestOptions)
            const hashedPassword = await response.json()
	    console.log(hashedPassword)	
            let SQL = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${req.body.firstname}', '${req.body.lastname}','${req.body.email}','${hashedPassword['hash']}')`
            connection.query(SQL, function(err,result) {
                if (err) {
                    res.send({
                        status: 'ERROR',
                        msg: err
                    })
                } else {
                    res.send({
                        status: "SUCCESS",
                        msg: "inserted into db"
                    })
                }
            })
        }

        insert()    
})

app.listen(3003, () => {
	console.log("listening on port 3003")
})  
