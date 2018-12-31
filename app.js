var express = require("express"),
    app= express(),
    bodyParser= require("body-parser"),
    mongoose= require("mongoose");
    


mongoose.connect("mongodb://localhost/contactUs_app");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));


var userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    subject: String,
    message: String,
    query: String,
    created : {type :Date , default: Date.now}
}); 

var Query = mongoose.model("Query",userSchema);

app.listen(8000, function(){
    console.log("Contact Us app running");
});


app.get("/", function(req,res){
    res.redirect("/query");
});

app.get("/query", function(req,res){
    Query.find({},function(err,queries){
        if(err){
            console.log(err);
        }else{
            res.render("index",{queries: queries});
        }
    });
});



app.post("/query",function(req,res){
    Query.create(req.body.query,function(err,newQuery){
        if(err){
            console.log(err);
            res.render("contact");
        }
        else{
            res.redirect("/query"); 
        }
    });
});
app.get("/query/contact", function(req,res){
    res.render("contact");
});

app.get("/query/:id",function(req,res){
    Query.findById(req.params.id, function(err,foundQuery){
        if(err){
            console.log(err);
            res.redirect("/query");
        }else{
            res.render("show",{query:foundQuery});
        }
    });
});
