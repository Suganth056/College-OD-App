const db=require('../../db_folder/db');

module.exports={
    post:(req,res)=>{
        const sqlQuery=`select * from AdvisorOdReqTable where Advisor_ID_NUM=?`;
        db.query(sqlQuery,[req.body.id_num],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json(data);
            }
        })
    },
    delete:(req,res)=>{
        const sqlQuery=`delete from AdvisorOdReqTable where student_uuid=?`;
        console.log(req.body);
        db.query(sqlQuery,[req.body.student_uuid],(err,data)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json("Fine Deleted")
            }
        })
    },
    get:(req,res)=>{
        const sqlQuery=`select * from HODTable where DEPT=?`
        console.log(req.body);
        db.query(sqlQuery,[req.body.dept],(err,data)=>{
            if(err){
                res.json("No data error",err);
            }
            else{
                
                res.json(data);
            }
        })
    }
}