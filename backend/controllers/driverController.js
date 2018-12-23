const express = require('express');
const router = express.Router();

var {Driver} = require('../models/driver');
var  ObjectId = require('mongoose').Types.ObjectId;

//=> localhost:3000/drivers
router.get('/', (req,res)=>{
    Driver.find((err, docs) =>
    {
        if(!err)
            res.send(docs);
        else
            console.log('Error in Retrieving Drivers: '+JSON.stringify(err,undefined,2));
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');
    else
        Driver.findById(req.params.id,(err, doc)=>{
            if(!err)
            {   res.send(doc);}
            else
            {console.log('Error in Retrieving Driver:'+JSON.stringify(err,undefined,2));}
        });
});
router.post('/',(req,res)=>{
    var driver = new Driver({
        name: req.body.name
    });
    driver.save((err, docs) =>
    {
        if(!err)
            res.send(docs);
        else
            console.log('Error in Saving Drivers: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var driver = {
        name: req.body.name
    };
    Driver.findByIdAndUpdate(req.params.id,{$set:driver},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Driver Update: '+JSON.stringify(err,undefined,2));
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var driver = {
        name: req.body.name
    };
    Driver.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Driver Delete: '+JSON.stringify(err,undefined,2));
    });
});

module.exports = router;