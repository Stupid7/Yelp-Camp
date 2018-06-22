var express = require("express");
var router  = express.Router();
var Campground =require("../models/campground");
var Comment =require("../models/comment");

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



router.post('/',isLoggedIn,function(req,res){
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
        res.redirect('/campgrounds');
    }
  });


});

router.get('/new',isLoggedIn,function(req,res){
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
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}



module.exports = router;
