const express = require('express');
const payments = require('../models/payments');
const Payments = require('../models/payments');

const router = express.Router();

//save payments
router.post('/payment/save',(req,res)=>{

    const userId = req.body.userId;
    const userName = req.body.userName;
    const paymentDate = Date.parse(req.body.paymentDate);
    const category = req.body.category;
    const description = req.body.description;
    const amount = Number(req.body.amount);

    const newPayment = new Payments({
        userId,
        userName,
        paymentDate,
        category,
        description,
        amount
    }); 

    newPayment.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:"Payment saved successfully"
        });


    })

}); 

// get payments
router.get('/payments',(req,res)=>{

    Payments.find().exec((err,payments)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

       return res.status(200).json({
            success:true,
            existingPayments:payments
       }); 

    });

});


//get specific payment

router.get("/payment/:id",(req,res)=>{

        let paymentId = req.params.id;

        Payments.findById(paymentId,(err,payment)=>{

            if(err){
                return res.status(400).json({success:false,err});
            }


            return res.status(200).json({
                success:true,
                payment

            });

        });



});


//update payments
router.put('/payment/update/:id',(req,res)=>{

    Payments.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                
                success:"Update successfuly"

            });

        }
        

    );

});

//delete payments
router.delete('/payment/delete/:id',(req,res)=>{
    Payments.findByIdAndRemove(req.params.id).exec((err,deletedPayment)=>{

        if(err){
            return res.status(400).json({
                    message:"Delete unsuccessful",err
            });
        }

        return res.json({
            message:"Delete Successful",deletedPayment
        });

    });
});



module.exports = router;