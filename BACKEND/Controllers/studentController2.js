const db=require('../db_folder/db');
 
module.exports={
    post:(req,res)=>{
        const sqlQuery=`insert into 
        studentodTable(StudentName,Student_ID_NUM,RegisterNum,Dept,StudyingYear,advisor_id,starting_date,ending_date,reason,shortDescription,student_uuid)
        values(?,?,?,?,?,?,?,?,?,?,?)`
        console.log(req.body)
        db.query(sqlQuery,
            [req.body.student_name,
            req.body.student_id,
            req.body.student_reg_no,
            req.body.student_Dept,
            req.body.student_Year,
            req.body.student_advisor_id,
            req.body.student_startDate,
            req.body.student_EndDate,
            req.body.student_reason,
            req.body.student_desc,
            req.body.uuidv4
        ],(err,data)=>{
            if (err) {
                console.error(err);
                // Respond only once with an error
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Database query failed.' });
                }
                return;
            }
            else{
                

                // db.query(retrievalQuery,)
                const sqlQuery2=`insert into AdvisorOdReqTable
                (Advisor_ID_NUM,StudentName,Student_ID_NUM,RegisterNum,Dept,StudyingYear,starting_date,ending_date,reason,shortDescription,student_uuid)
                values(?,?,?,?,?,?,?,?,?,?,?)
                `;

                db.query(sqlQuery2,[
                    req.body.student_Advisor_id,
                    req.body.student_name,
                    req.body.student_id,
                    req.body.student_reg_no,
                    req.body.student_Dept,
                    req.body.student_Year,
                    req.body.student_startDate,
                    req.body.student_EndDate,
                    req.body.student_reason,
                    req.body.student_desc,
                    req.body.uuidv4
                ],(err,data)=>{
                    if(err){
                        console.error(err);
                    }
                    else{
                        console.log("Successfully Updated")
                    }
                })
            }

            // Respond only once with success
            if (!res.headersSent) {
                res.status(200).json({ message: 'Student OD DATA updated successfully.' });
            }
        })
    },
    get:(req,res)=>{
        const sqlQuery=`select * from studentodTable `;
        // res.json("Offer Received");
        // console.log(req.body)
        db.query(sqlQuery,(err,data)=>{
            if(err){
                console.log(err);

            }
            else{
                res.json(data);
            }
        })
    },
    delete:(req,res)=>{
        console.log(req.body);
        const sqlQuery=`delete from studentodTable where student_uuid=?;`
        db.query(sqlQuery,[req.body.id],(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(res.json(data));
            }
        })
    },

    put:(req,res)=>{
        const sqlQuery=`update studentodTable set remarks=? where student_uuid=?`;
        console.log(req.body);
        db.query(sqlQuery,[req.body.remarks,req.body.student_uuid],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json("Sent successfully");
            }
        })
    },
    putX:(req,res)=>{
        const sqlQuery=`update studentodTable set od_status="Rejected" where student_uuid=?`;
        db.query(sqlQuery,[req.body.student_uuid],(err,data)=>{
            if(err){
                console.log("Error :",err)
                res.json(err)
            }
            else{
                res.json("Rejected Message..........")
            }
        })
    } ,
    putCount:(req,res)=>{
        const sqlQuery=`update studentodTable set count=? where student_uuid=?`;
        db.query(sqlQuery,[req.body.count,req.body.data.student_uuid],(err,data)=>{
            if(err){
                res.json(err);
            }
            else{
                res.json("Accepted Count Increases")
            }
        })
    },
    update:(req,res)=>{
        const sqlQuery=`update studentodTable set od_status="Accepted" where student_uuid=?`;
        db.query(sqlQuery,[req.body.student_uuid],(err,data)=>{
            if(err){
                console.log("Error :",err)
                res.json(err)
            }
            else{
                res.json("Accepted Message..........")
            }
        })
    }
}