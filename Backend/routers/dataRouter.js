const userData = require('../models/userData');
const router = require('express').Router();

// const express = require('express');
// const router = express.Router();

// add user
// fetch all users
// fetch user by id
// update user
// delete user
// authenticate user

// performing db operations
// to add
router.post('/add', (req, res) => {
    // reading client data from request body
    console.log(req.body);
    // res.send('response from user router');

    // Create Operation
    new userData(req.body).save()
        .then((result) => {
            console.log(result);
            console.log('data saved');
            res.json(result);
        }).catch((err) => {
            console.error(err);
            res.json(err);
        });
})

router.get('/getall', (req, res) => {
    userData.find({})
    .then((result) => {
        console.log(result);
        setTimeout(() => {
            res.json(result);
        }, 500);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
    // res.send('response from user router at getall');
});


router.get('/getbyid/:userid', (req, res) => {
    
    userData.findById( req.params.userid )
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})


router.delete('/delete/:userid', (req, res) => {
    userData.findByIdAndDelete( req.params.userid )
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})

router.put('/update/:userid', (req, res) => {
    userData.findByIdAndUpdate(req.params.userid, req.body, {new : true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
});

router.post('/authenticate', (req, res) => {

    userData.findOne({email : req.body.email, password : req.body.password})
    .then((userdata) => {
        if(userdata){
            res.status(200).json(userdata);
        }else{
            res.status(300).json({message : 'Invalid Credentials'});
        }
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    })
})

module.exports = router;