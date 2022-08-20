const UserModel = require('../models/userModel');
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
    new UserModel(req.body).save()
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
    UserModel.find({})
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

router.get('/checkemail/:userage', (req, res) => {
    
    // to fetch client data from get request
    console.log(req.params.useremail);
    
    UserModel.findOne({email : req.params.useremail})
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})

router.get('/getbyid/:userid', (req, res) => {
    
    UserModel.findById( req.params.userid )
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})


router.delete('/delete/:userid', (req, res) => {
    UserModel.findByIdAndDelete( req.params.userid )
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})

router.put('/update/:userid', (req, res) => {
    UserModel.findByIdAndUpdate(req.params.userid, req.body, {new : true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
});

router.post('/authenticate', (req, res) => {

    UserModel.findOne({email : req.body.email, password : req.body.password})
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