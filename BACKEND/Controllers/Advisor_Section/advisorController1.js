
 
const db=require('../../db_folder/db');

module.exports={
    get:(req,res)=>{
        // res.json("Feeding from Advisor Controller through routes");
        const sqlQuery="select * from AdvisorTable";
        db.query(sqlQuery,(err,data)=>{
            if(err){
                console.log("Error____",err)
            }
            else{
                res.json(data)
            }
        })
    },
    put:(req,res)=>{
        const sqlQuery=`
        update AdvisorTable
        SET AdvisorName=?,
        AdvisorLastName =?,
        Email =?,
        DEPT =?,
        YearOfAdvisor =?,
        Gender =?,
        phone_num =?,
        address =?,
        dob =?,
        pwd =?

        where Advisor_ID_NUM =? ;
        `;
        console.log(req.body)
        db.query(sqlQuery,
            [
            req.body.advisor_fname ,
            req.body.advisor_lname ,
            req.body.advisor_Email,
            req.body.advisorDept,
            req.body.advisorYear, 
            req.body.advisorGender,
            req.body.advisorPh_no,
            req.body.advisorAddress,
            req.body.advisorDob,
            req.body.advisorPwd,
            req.body.advisor_Id
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
    }
}