var express = require('express');
var router = express.Router();

let id = {id: new Date().getTime()};
let todolist = {text:""};
let completed = {completed: false};

/* GET users listing. */
router.get('/todos', function(req, res, next) {
    res.send([id, todolist, completed]);
    console.log(todolist);
});

router.post('/todos', (req, res) =>{
    todolist.todos.string;
    res.send([id, todolist, completed]);
    console.log(todolist)
});

module.exports = router;
