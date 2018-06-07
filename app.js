var app = require('express')();
var bodyParser = require('body-parser');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
var campgrounds =
 [
      {name:'Lantang', image:'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg',des:'National Park'},
      {name:'Namche', image:'https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg',des:'Beautiful'},
      {name:'Deurali', image:'https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg',des:'tough'},
      {name:'Sagarmatha', image:'https://farm4.staticflickr.com/3138/2930534425_064ccd523b.jpg',des:'Highest' },
      {name:'Goshaikunda', image:'https://farm2.staticflickr.com/1374/1353505263_a623a8d69b.jpg',des:'Best pond' },
      {name:'okhaldhunga', image:'https://farm2.staticflickr.com/1613/26483690236_511679cd25.jpg',des:'Big Stone' },
      {name:'Antu', image:'https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104497f5c579a0eeb5b0_340.jpg',des:'Best Sunrise' },
      {name:'Dhunche', image:'https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c579a0e4b7ba_340.jpg',des:'Best to settle' }
 ];

app.get('/',function(req,res){
  res.render('landing');
});

app.get('/campgrounds',function(req,res){
  res.render('campgrounds',{campground:campgrounds})
});



app.post('/campgrounds',function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.des;
  var newCampground = {name: name, image: image, des: des};

  campgrounds.push(newCampground);
  res.redirect('/campgrounds');

});

app.get('/campgrounds/new',function(req,res){
  res.render('new');
});

app.listen(3000,function(){
  console.log("Server Started on port 3000");
});
