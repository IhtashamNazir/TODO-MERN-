var db = require('../database/connection');
var express = require('express');
var Router = express.Router();

Router.get('/', (req, res)=> {
    db.query('SELECT * FROM `todo`', (err, data) => {
        if (err) {
            res.json({
                success: false,
                err: err.message
            })
        }
        if (data) {
            res.json({
                success: true,
                todoList: data
            })
        }
    });
})

Router.get('/:id', (req, res)=> {
    let ID = req.params.id;
    db.query('SELECT * FROM `todo` WHERE todo.ID = ?', [ID], (err, data) => {
        if (err) {
            res.json({
                success: false,
                err: err.message
            })
        }
        if (data.length === 1) {
            res.json({
                success: true,
                todoo: data[0].todo,
                todooID: data[0].ID
            })
        }
    });
})

Router.put('/toggle', (req, res)=> {
    let id = req.body.ID;
    let toggleCom = null;
    db.query('SELECT `completed` FROM `todo` WHERE todo.ID = ?', [id], (err1, result1)=>{
        if(err1){
            res.json({
                err:err1.message
            })
        }
        if(result1){
            if(result1[0].completed == 1){
                toggleCom = 0
            }else{
                toggleCom = 1
            }
            db.query('UPDATE `todo` SET `completed`= ? WHERE todo.ID = ?', [toggleCom, id], (err, result)=> {
                if (err) {
                    res.json({
                        success: false,
                        err: err.message
                    })
                    return;
                }
                if (result) {
                    res.json({
                        success: true
                    })
                }
                return;
            });
        }
    } )
    
});

Router.put('/', (req, res)=> {
    let id = req.body.ID;
    let toodo = req.body.toodo;
    db.query('UPDATE `todo` SET `todo`=? WHERE todo.ID = ?', [toodo, id], (err, result)=> {
        if (err) {
            res.json({
                success: false,
                err: err.message
            })
            return;
        }
        if (result) {
            res.json({
                success: true
            })
        }
        return;
    });
});


Router.post('/', (req, res)=> {
    let todoo = req.body.todoo;

    var values = [todoo];
    db.query('INSERT INTO `todo`(`todo`) VALUES (?)', [values], (err, result) => {
        if (err) {
            res.json({
                success: false,
                err: err.message
            })
            return;
        }
        console.log("1 record inserted");
        if(result){
            res.json({
            success: true
            })
        }

    });
});




Router.delete('/', (req, res)=> {
    let ID = req.body.Id;
    db.query('DELETE FROM `todo` WHERE todo.ID = ?', [ID], (err, result) => {
        if (err) {
            res.json({
                success: false,
                err: 'No record Found'
            })
            return;
        }
        if (result) {
            console.log("1 record deleted");
            res.json({
                success: true
            })
            return;
        }
    });
});




module.exports = Router;