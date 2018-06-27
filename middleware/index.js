var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {}

middlewareObj.checkCampOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,data){
      if(err){
        res.redirect("back");
      }
      else{
        if(data.author.id.equals(req.user._id)){
          next();
        }
        else{
          res.redirect("back");
        }
      }
    });
  }else{
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,data){
      if(err){
        res.redirect("back");
      }
      else{
        if(data.author.id.equals(req.user._id)){
          next();
        }
        else{
          res.redirect("back");
        }
      }
    });
  }else{
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = middlewareObj;
