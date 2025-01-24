


const db=require('../db_folder/db');

 


module.exports={
    get:(req,res)=>{
        const sqlQuery="select * from StudentTable";
        db.query(sqlQuery,(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(data);
            }
        })
    },
    put:(req,res)=>{
        const sqlQuery=`UPDATE StudentTable 
        SET 
            StudentName = ?, 
            StudentLastName = ?, 
            Gender = ?, 
            phone_num = ?, 
            address = ?, 
            dob = ?, 
            pwd = ?, 
            Email = ?,
            RegisterNum=?,
            Regulation=?,
            YearOfStudying=?
        WHERE Student_ID_NUM = ? ;
    `;
    db.query(
        sqlQuery, 
        [req.body.student_fname , req.body.student_lname ,req.body.studentGender, req.body.studentPh_no ,req.body.studentAddress, req.body.studentDob,req.body.studentPwd,req.body.student_Email,req.body.student_roll_num,req.body.regulation, req.body.studentYear, req.body.student_Id], 
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
                res.status(200).json({ message: 'Student updated successfully.' });
            }
        }
    );
    }
}