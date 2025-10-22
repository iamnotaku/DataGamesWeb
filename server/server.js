import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const app = express();

const port = 8080;

const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'francesco',
        password: 'mysql',
        database: 'datagames'
    }
);

// executing connection to DB
db.connect(function(err) {
    if (err) {
        console.log("Error occurred while connecting");
    } else {
        console.log("connection created with mysql successfully");
    }
});

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.json({Error: "You are not authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"});
            } else {
                req.username = decoded.username;
                req.permission = decoded.permission;
                next();
            }
        })
    }
}


app.get("/", verifyUser, (req, res) => {
    return res.json({Status: "Success", username: req.username, permission: req.permission});
})


app.post('/register', (req, res) => {
    const sql = 'INSERT INTO utenti (nome, cognome, data_di_nascita, username, email, password, permission, salt) VALUES (?)';

    const salt = getRandomInt(Number.MAX_SAFE_INTEGER);
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error while hashing password"});
        const values = [
            req.body.name,
            req.body.surname,
            req.body.birth,
            req.body.username,
            req.body.email,
            hash,
            "user",
            salt
        ]
        
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Error while querying datas in datagames"});
            return res.json({Status: "Success"});
        })
    })
    
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM utenti WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const username = data[0].username;
                    const permission = data[0].permission;
                    const token = jwt.sign({username, permission}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password does not match"});
                }
            });
        } else {
            return res.json({Error: "No email existed"});
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})


app.get('/reserved_area', (req, res) => {
    const sql = 'SELECT id_genere, genere FROM generi';

    db.query(sql, (err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
})

app.listen(port, () => 
    {
        console.log(`Server is running on port ${port}`);
    })