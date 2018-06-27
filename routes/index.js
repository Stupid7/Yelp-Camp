var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");


router.get('/',function(req,res){
  res.render('landing');
});


// // ==============================
//show register form
router.get("/register",function(req,res){
  res.render("register");
});

//handle sign up logic

router.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      req.flash("error", err.message+".");
      console.log(err);
      return res.redirect("register");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome to YelpCamp "+user.username);
      res.redirect("/campgrounds");
    });
  });
});

// // login Routes
router.get("/login",function(req,res){
  res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local",
{
  // req.flash("success","Welcome Back To YelpCamp");
  successRedirect:"/campgrounds",
  // req.flash("Error","Username or Password you Entered is Incorrect.");
  failureRedirect:"/login"
}), function(req,res){
});

// //logout
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Successfully Signed Out");
  res.redirect("/campgrounds");
});

module.exports = router;
