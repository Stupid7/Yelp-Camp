var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground =require("../models/campground");
var Comment =require("../models/comment");
var middleware = require("../middleware");


// //Comment Routes
router.get("/new", middleware.isLoggedIn,function(req,res){
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

router.post("/", middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      // console.log("req.body.params"+req.body.comment);
      Comment.create(req.body.comment,function(err,datas){
        if(err){
          console.log(err);
        }
        else {
          // console.log(datas);
          datas.author.id = req.user._id;
          datas.author.username = req.user.username;
          datas.save();
          // console.log(datas);
          // console.log("Username  Dtasadas is "+ datas.author.username);
          data.comments.push(datas);
          data.save();
          req.flash("success","Successfully added New Comment.")
          res.redirect("/campgrounds/"+data._id);
        }
        // console.log("=======>>>>>>>>>==========="+comments);
      });
    }
  });

});

// //
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id, function(err, data){
    if(err){
      res.redirect("back");
    }
    else {
        res.render("comments/edit",{campground_id: req.params.id, comment:data});
    }
  });
});

router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,data){
    if(err){
      res.redirect("back");
    }
    else {
      req.flash("Success","Successfully Updated Comment.");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

// // DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err,data){
    if(err){
      res.redirect("back");
    }
    else {
      req.flash("success","Selected comment is Deleted.");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

module.exports = router;
