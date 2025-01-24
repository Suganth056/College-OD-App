const db=require('../../db_folder/db');


const formatDate=(date_field)=>{
    const date = new Date(date_field);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
}

module.exports={
    get:(req,res)=>{
        const sqlQuery="select * from PrincipalTable";
        db.query(sqlQuery,(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json(data);
            }
        })
    },
    put:(req,res)=>{
        const sqlQuery=`
        update PrincipalTable
        SET PrincipalName=?,
        PrincipalLastName =?,
        Email =?,
        Gender =?,
        phone_num =?,
        address =?,
        dob =?,
        pwd =?

        where Principal_ID_NUM =? ;
        `;
        console.log(req.body)
        db.query(sqlQuery,
            [
            req.body.principal_fname ,
            req.body.principal_lname ,
            req.body.principal_Email, 
            req.body.principalGender,
            req.body.principalPh_no,
            req.body.principalAddress,
            req.body.principalDob,
            req.body.principalPwd,
            req.body.principal_Id
        ],(err, result) => {
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
                
                res.status(200).json({ message: 'Advisor updated successfully.' });
            }
        }
    )
    },
    post:(req,res)=>{
        const sqlQuery=`insert into
        PrincipalOdReqTable(Principal_ID_NUM,
        Student_ID_NUM,
        RegisterNum,
        StudentName,
        Dept,
        StudyingYear,
        starting_date,
        ending_date,
        reason,
        shortDescription,
        student_uuid
        )
        values(?,?,?,?,?,?,?,?,?,?,?)
        `;
        console.log(req.body);
        db.query(sqlQuery,[
            req.body.principal_id_num,
            req.body.data.Student_ID_NUM,
            req.body.data.RegisterNum,
            req.body.data.StudentName,
            req.body.data.Dept,
            req.body.data.StudyingYear,
            formatDate(req.body.data.starting_date),
            formatDate(req.body.data.ending_date),
            req.body.data.reason,
            req.body.data.shortDescription,
            req.body.data.student_uuid
        ],(err,data)=>{
            if(err){
                res.json(err)
            }
            else{

                res.json(data);
            }
        })
    },

    getOdData:(req,res)=>{
        const sqlQuery=`select * from PrincipalOdReqTable where Principal_ID_NUM=?`;
        console.log(req.body)
        db.query(sqlQuery,[req.body.user_id],(err,data)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(data);
            }
        })
    },

    delete:(req,res)=>{
        const sqlQuery=`delete from PrincipalOdReqTable where student_uuid=?`
        console.log(req.body);
        db.query(sqlQuery,[req.body.student_uuid],(err,data)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json("Fine Deleted")
            }
        })
    }
}