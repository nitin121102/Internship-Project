var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Blog  = require("./models/blog"),
    Comment     = require("./models/comment"),
     User        = require("./models/user"),
     passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash");
      var commentRoutes    = require("./routes/comments"),
    BlogRoutes = require("./routes/blog"),
    indexRoutes      = require("./routes/index")
    
    // PASSPORT CONFIGURATION
            app.use(require("express-session")({
                secret: "Delhi Universities Website",
                resave: false,
                saveUninitialized: false
            }));
            app.use(passport.initialize());
            app.use(passport.session());
            passport.use(new LocalStrategy(User.authenticate()));
            passport.serializeUser(User.serializeUser());
            passport.deserializeUser(User.deserializeUser());
            
          

// APP CONFIG
mongoose.connect("mongodb://localhost/finalproject3");

app.use(express.static("css"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
  app.use(function(req, res, next){
               res.locals.currentUser = req.user;
               res.locals.error = req.flash("error");
                res.locals.success = req.flash("success");
               next();
            });

//  Blog.create({ logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnVKpFBPe-nbYzkG166mmYovTMKfq6acQV84QqPBiYDIrXHxCVA",
//                link:"andcollege.du.ac.in/",
//                spot:"hello"
//               },
//  function(err, blog){
 
//        if(err){
     
//              console.log("error aa gya bhai");
 
//       } else {
   
//     console.log(blog);

//     }
// });

app.get("/",function(req,res){
    
      res.redirect("/home"); 
    // res.send("hello this is working fine");
    
});

app.get("/home/feeds",function(req,res){
    
      res.render("feed.ejs"); 
    // res.send("hello this is working fine");
    
});



            function isLoggedIn(req, res, next){
                if(req.isAuthenticated()){
                    return next();
                }
                req.flash("success","please Login first");
                res.redirect("/login");
            }
              
            app.use("/", indexRoutes);
            app.use("/home", BlogRoutes);
            app.use("/home/:id/comments", commentRoutes);
            
          
app.listen(process.env.PORT,process.env.IP,function(){
console.log("server has started");
});