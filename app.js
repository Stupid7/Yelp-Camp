var express         = require('express');
    bodyParser      = require('body-parser');
    mongoose        = require('mongoose');
    passport        = require("passport");
    LocalStrategy   = require("passport-local");
    Campground      = require("./models/campground");
    methodOverride  = require("method-override");
    Comment         = require("./models/comment");
    User            = require("./models/user");
    seedDB          = require("./seeds");
    app             = express();

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");



mongoose.connect("mongodb://localhost/yelp_camp_v8");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// // Password Configuration
app.use(require("express-session")({
  secret:"Nepal is Beautiful",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,function(){
  console.log("Server Started on port 3000");
});
