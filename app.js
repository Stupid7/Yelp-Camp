var express         = require('express');
    bodyParser      = require('body-parser');
    mongoose        = require('mongoose');
    Campground      = require("./models/campground");
    Comment         = require("./models/comment");
    seedDB          = require("./seeds");
    app             = express();




mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// seedDB();
// Campground.create(
//   {
//     name:'Sagarmatha',
//     image:'https://farm4.staticflickr.com/3138/2930534425_064ccd523b.jpg',
//     des:'Highest Mountain',
//     moreDesc:'Commonly known as Mount Everest.It is the highest mountain in the World with height of 8848 meters.'
//  },
// function(err,data){
//   if(err){
//     console.log("something went wrong");
//     console.log(err);
//   }
//   else {
//     console.log(data);
//   }
// });

// var campgrounds =
//  [
//       {name:'Lantang', image:'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg',des:'National Park'},
//       {name:'Namche', image:'https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg',des:'Beautiful'},
//       {name:'Deurali', image:'https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg',des:'tough'},
//       {name:'Sagarmatha', image:'https://farm4.staticflickr.com/3138/2930534425_064ccd523b.jpg',des:'Highest' },
//       {name:'Goshaikunda', image:'https://farm2.staticflickr.com/1374/1353505263_a623a8d69b.jpg',des:'Best pond' },
//       {name:'okhaldhunga', image:'https://farm2.staticflickr.com/1613/26483690236_511679cd25.jpg',des:'Big Stone' },
//       {name:'Antu', image:'https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104497f5c579a0eeb5b0_340.jpg',des:'Best Sunrise' },
//       {name:'Dhunche', image:'https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c579a0e4b7ba_340.jpg',des:'Best to settle' }
//  ];

app.get('/',function(req,res){
  res.render('landing');
});

app.get('/campgrounds',function(req,res){
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



app.post('/campgrounds',function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.des;
  var moreDesc = req.body.moreDesc;
  var newCampground = {name: name, image: image, des: des, moreDesc: moreDesc};

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

app.get('/campgrounds/new',function(req,res){
  res.render('campgrounds/new');
});

app.get('/campgrounds/:id',function(req,res){
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

// //Comment Routes
app.get("/campgrounds/:id/comments/new",function(req,res){
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

app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(3000,function(){
  console.log("Server Started on port 3000");
});
