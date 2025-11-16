
// Testing Superheroes
// const superhero = require("superheroes");
// let hero = superhero.randomSuperhero()
// console.log(hero);

//Express
const express = require('express');
const day_1_Routes = express();
const bodyParser = require('body-parser');
day_1_Routes.use(bodyParser.json());
day_1_Routes.listen(3000,() => {console.log("Port 3000")})

let userList = [
    {
        id : 1,
        name : "Myo Win",
        email : "myowin@gmail.com",
    },
    {
        id : 2,
        name : "John Doe",
        email : "john@gmail.com",
    }
]

day_1_Routes.get("/", (req, res) => {
    res.status(200).send({one : "Good"});
})

day_1_Routes.get("/users", (req, res) => {
    res.status(200).send({userList : userList});
})

day_1_Routes.get("/user/:id", (req, res) => {
    let user = userList.find(usr => usr.id == req.params.id);
    res.status(200).send({user : user});
})

day_1_Routes.get("/user/:id/:name", (req, res) => {
    res.status(200).send({id : req.params.id, name : req.params.name});
})

day_1_Routes.post("/user", (req, res) => {
    userList.push(req.body);
    res.status(200).send({user : userList});
})

day_1_Routes.patch("/user/:id", (req, res) => {
    let editUser = userList.find(usr => usr.id == req.params.id);
    editUser.name = req.body.name;
    editUser.email = req.body.email;
    return res.status(200).json({user : userList});
})

day_1_Routes.delete("/user/:id", (req, res) => {
    userList = userList.filter(usr => usr.id != req.params.id);
    res.status(200).json({user : userList})
})
