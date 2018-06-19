var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground =require("../models/campground");
var Comment =require("../models/comment");


// //Comment Routes
router.get("/new",isLoggedIn,function(req,res){
  // // Find BY ID
  Campground.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
    }
    else {
      res.render("./comments/new",{campground:data});
    }
  })
});

router.post("/",isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      Comment.create(req.body.comment,function(err,datas){
        if(err){
          console.log(err);
        }
        else {
          data.comments.push(datas);
          data.save();
          res.redirect("/campgrounds/"+data._id);
        }
      });
    }
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
