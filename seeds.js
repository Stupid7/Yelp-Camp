var mongoose          = require("mongoose"),
Campground            = require("./models/campground"),
Comment               = require("./models/comment");

var data = [
  {
    name:"Lantang",
    image:'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg',
    des:"National Park",
    moreDesc:"BLAH  blah blah blah blah blah blah blah"
  },
  {
    name:"Antu",
    image:'https://farm4.staticflickr.com/3138/2930534425_064ccd523b.jpg',
    des:"Best Sunrise",
    moreDesc:"BLAH  blah blah blah blah blah blah blah"
  },
  {
    name:"Everest",
    image:'https://farm2.staticflickr.com/1374/1353505263_a623a8d69b.jpg',
    des:"Highest Mountain",
    moreDesc:"BLAH  blah blah blah blah blah blah blah"
  }
]

function seedDB(){
  //Remove ALL CAMPGROUNDS
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("Removed CAMPGROUND");
    //ADD FEW CampGround
    data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
        if(err){
          console.log(err);
        }
        else{
          console.log("ADDED CAMOGROUND");
          //Create Commentss
          Comment.create(
            {
              text:"This is Great Blah Blah Blah Blah",
              author:"Sudip"
            }
          ,function(err,comment){
            if(err){
              console.log(err);
            }
            else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created New Comment");
            }
          });
        }
      });
    });
  });
//ADD FEW COMMENTS
}

module.exports  = seedDB;
