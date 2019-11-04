var express=require("express");
var router=express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");


// INDEX ROUTE

router.get("/landing",function(req,res){
    
      res.redirect("landing"); 
    // res.send("hello this is working fine");
    
});

router.get("/", function(req, res){
    
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Blog.find({name: regex}, function(err, blogs){
           if(err){
               console.log(err);
           } else {
              
              res.render("index.ejs",{blogs:blogs});
           }
        });
    }
    else{
    
    
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("index.ejs", {blogs: blogs}); 
       }
   });
    }
});
router.get("/home",function(req,res){
    
      res.redirect("/home"); 
    // res.send("hello this is working fine");
    
});


// NEW ROUTE
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("new.ejs");
});

// CREATE ROUTE
router.post("/", function(req, res){
    // create blog
//     console.log(req.body);
//     console.log("===========")
//     console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new.ejs");
        } else {
            //then, redirect to the index
            res.redirect("/home");
        }
    });
});


// SHOW ROUTE
router.get("/:id", function(req, res){
 Blog.findById(req.params.id).populate("comments").exec(function(err, foundpage){
       if(err){
           res.redirect("/home");
       } else {
           
           res.render("show.ejs", {blog: foundpage});
           
       }
   })
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports=router;
