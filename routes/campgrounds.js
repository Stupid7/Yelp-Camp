var express = require("express");
var router  = express.Router();
var Campground =require("../models/campground");
var Comment =require("../models/comment");
var middleware = require("../middleware");

router.get('/',function(req,res){
  Campground.find({},function(err,data){
    if(err){
      console.log("Something Went Wrong");
      console.log(err);
    }
    else {
      console.log("All Datas....");
      res.render('campgrounds/index',{campground:data});
    }
  })
});



router.post('/', middleware.isLoggedIn,function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.des;
  var moreDesc = req.body.moreDesc;
  var author = {
    id:req.user._id,
    username:req.user.username
  }
  var newCampground = {name: name, image: image, des: des, moreDesc: moreDesc,author:author};

  Campground.create(newCampground,function(err,data){
    if(err){
      console.log("Something Went Wrong");
      console.log(err);
    }
    else {
      console.log("New Data Added--->>");
        req.flash("success","New Campground Added.")
        res.redirect('/campgrounds');
    }
  });


});

router.get('/new', middleware.isLoggedIn,function(req,res){
  res.render('campgrounds/new');
});

router.get('/:id',function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,data){
      if(err){
        console.log("something Went Wrong");
        console.log(err);
      }
      else {
        console.log("campground found by ID-->>>>");
        console.log(data);
        res.render('campgrounds/show',{campground:data});
      }
  });
});

// // EDIT CAmpground ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function(req,res){
  Campground.findById(req.params.id,function(err,foundid){
    if(err){
      res.redirect("/campgrounds");
    }
    else{
        res.render("campgrounds/edit",{campground: foundid});
    }
  })
});

// // UPDATE Campground ROUTE
router.put("/:id", middleware.checkCampOwnership, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCamp){
    if(err){
      res.redirect("/campgrounds");
    }
    else {
      // req.flash("success","Updated ");
      res.redirect("/campgrounds/"+ updatedCamp._id);
    }
  });
});

// // DESTROY Routes

router.delete("/:id", middleware.checkCampOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/campgrounds");
    }
    else{
      req.flash("success","Selected Campground Deleted.");
      res.redirect("/campgrounds");
    }
  });
});
module.exports = router;
