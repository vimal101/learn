const express  = require('express');
const app  =  express();
const bodyparser = require('body-parser');
const https =  require("https");


app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function (req,res) {
    const  fname  = req.body.fname;
    const lname  = req.body.lname;
    const email  = req.body.email;
    //console.log(fname,lname,email);

    const data = {
        members:[{
            email_address:email,
            status:"subscribed",
           merge_field:{
            FNAME:fname,
            LNAME:lname
           }
        }]
    };
    const url = "https://us21.api.mailchimp.com/3.0/lists/e2d490fa60";
const option ={
    method :"POST",
    auth:   "vimal101:c04df68a185c37aae5951f346e37c1b4-us21"
}
    const jsondata  = JSON.stringify(data)
     const request = https.request( url,option,function (response) {
       
       if(response.statusCode === 200)
{
res.sendFile(__dirname+"/success.html");
}   else{
    res.sendFile(__dirname+"/failure.html");
}    
        response.on("data",function (data) {
            console.log(JSON.parse(data));
        })
    })


    request.write(jsondata);
    request.end();
})



app.post("/failure",function(req,res){
res.redirect(  "/");
})

app.listen( process.env.PORT ||3000,function(){
    console.log("server start3000");

})
//https://server.api.mailchimp.com/3.0

//c04df68a185c37aae5951f346e37c1b4-us21
//e2d490fa60.