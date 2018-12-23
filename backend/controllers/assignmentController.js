const express = require('express');
const router = express.Router();

var {Assignment} = require('../models/assignment');
var  ObjectId = require('mongoose').Types.ObjectId;

//=> localhost:3000/assignments
router.get('/', (req,res)=>{
    Assignment.find((err, docs) =>
    {
        if(!err)
            res.send(docs);
        else
            console.log('Error in Retrieving Assignments: '+JSON.stringify(err,undefined,2));
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');
    else
        Assignment.findById(req.params.id,(err, doc)=>{
            if(!err)
            {   res.send(doc);}
            else
            {console.log('Error in Retrieving Assignment:'+JSON.stringify(err,undefined,2));}
        });
});
router.post('/',(req,res)=>{
    var assignment = new Assignment({
        name: req.body.name,
        code: req.body.code,
        appointmentTime: req.body.appointmentTime,
        scheduledTime: req.body.scheduledTime,
        actualArrival: req.body.actualArrival,
        status: req.body.status,
        departTime: req.body.departTime,
        hosCount: req.body.hosCount,
        countEndTime: req.body.countEndTime,
        dropOffTime: req.body.dropOffTime,
        duration: req.body.duration,
        waitingTime: req.body.waitingTime,
        nextReset: req.body.nextReset
    });
    assignment.save((err, docs) =>
    {
        if(!err)
            res.send(docs);
        else
            console.log('Error in Saving Assignments: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/actualArrival/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        actualArrival: req.body.actualArrival,
        status: req.body.status,
        nextReset: req.body.nextReset
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/editAssign/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        name: req.body.name,
        code: req.body.code,
        appointmentTime: req.body.appointmentTime,
        scheduledTime:req.body.scheduledTime
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/departTime/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        departTime: req.body.departTime
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/dropOff/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        dropOffTime: req.body.dropOffTime,
        duration: req.body.duration,
        waitingTime: req.body.waitingTime
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/countEnd/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        countEndTime: req.body.countEndTime
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.put('/waitingTime/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        waitingTime: req.body.waitingTime
    };
    Assignment.findByIdAndUpdate(req.params.id,{$set:assignment},{new:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id)');

    var assignment = {
        name: req.body.name
    };
    Assignment.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in Assignment Delete: '+JSON.stringify(err,undefined,2));
    });
});

module.exports = router;