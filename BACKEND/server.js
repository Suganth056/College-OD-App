const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const mysql=require('mysql');
const cors=require('cors');

const PORT=process.env.PORT || 8080;

const studentRouter=require('./routes/studentRouter');
const advisorRouter=require('./routes/advisorRouter');
const hodRouter=require('./routes/hodRouter');
const principalRouter=require('./routes/principalRouter');
 
app.use(express.json())
app.use(cors());
app.use(bodyParser.json()); // Parse incoming request bodies
app.use('/student',studentRouter);
app.use('/advisor',advisorRouter);
app.use('/hod',hodRouter);
app.use('/principal',principalRouter);


const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'lionel30',
    database:'odDatabase'
})


// app.use('/student-entry-data',require('./admin_Folder/adminWorks'));

app.get('/admin',(req,res)=>{
    const sqlQuery="select * from adminTable";
    db.query(sqlQuery,(err,data)=>{
        if(err) res.json(err);
        else{
            res.json(data)
        }
    })
    
})

app.post('/adminSignup',(req,res)=>{
    res.json("Res Ok");
    console.log("Body-Content",req.body);

    const sqlQuery= `
        UPDATE adminTable 
        SET 
            AdminName = ?, 
            AdminLastName = ?, 
            Gender = ?, 
            phone_num = ?, 
            address = ?, 
            dob = ?, 
            pwd = ?, 
            email = ?
        WHERE ID_NUM = ?
    `;

    console.log(sqlQuery);
    
    db.query(
        sqlQuery, 
        [req.body.ufname, req.body.ulname, req.body.uGender, req.body.uPh_no, req.body.uAddress, req.body.uDob, req.body.uPwd, req.body.uEmail, req.body.uId], 
        (err, result) => {
            if (err) {
                console.error(err);
                // Respond only once with an error
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Database query failed.' });
                }
                return;
            }

            // Respond only once with success
            if (!res.headersSent) {
                res.status(200).json({ message: 'Admin updated successfully.' });
            }
        }
    );

    
    
})

// Entry Section Started

app.post('/student-entry',(req,res)=>{
    console.log("Body-Content",req.body);

    const sqlQuery= `
        insert into StudentTable(Student_ID_NUM) values (?)
    `;
    db.query(sqlQuery,[req.body.studentID],(err, result) => {
        if (err) {
            console.error(err);
            // Respond only once with an error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Database query failed.' });
            }
            return;
        }

        // Respond only once with success
        if (!res.headersSent) {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    })


})

app.post('/advisor-entry',(req,res)=>{
    console.log("Body-Content",req.body);

    const sqlQuery= `
        insert into AdvisorTable(Advisor_ID_NUM) values (?)
    `;
    db.query(sqlQuery,[req.body.advisorID],(err, result) => {
        if (err) {
            console.error(err);
            // Respond only once with an error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Database query failed.' });
            }
            return;
        }

        // Respond only once with success
        if (!res.headersSent) {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    })


})

app.post('/hod-entry',(req,res)=>{
    console.log("Body-Content",req.body);

    const sqlQuery= `
        insert into HODTable(HOD_ID_NUM) values (?)
    `;
    db.query(sqlQuery,[req.body.hodID],(err, result) => {
        if (err) {
            console.error(err);
            // Respond only once with an error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Database query failed.' });
            }
            return;
        }

        // Respond only once with success
        if (!res.headersSent) {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    })


})

app.post('/principal-entry',(req,res)=>{
    console.log("Body-Content",req.body);

    const sqlQuery= `
        insert into PrincipalTable(Principal_ID_NUM) values (?)
    `;
    db.query(sqlQuery,[req.body.principalID],(err, result) => {
        if (err) {
            console.error(err);
            // Respond only once with an error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Database query failed.' });
            }
            return;
        }

        // Respond only once with success
        if (!res.headersSent) {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    })


})

app.post('/admin-entry',(req,res)=>{
    console.log("Body-Content",req.body);

    const sqlQuery= `
        insert into adminTable(ID_NUM) values (?)
    `;
    db.query(sqlQuery,[req.body.adminID],(err, result) => {
        if (err) {
            console.error(err);
            // Respond only once with an error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Database query failed.' });
            }
            return;
        }

        // Respond only once with success
        if (!res.headersSent) {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    })


})

//Entry Section Ended

app.listen(PORT,()=>{
    console.log("Listening",PORT)


})
