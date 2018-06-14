// var mongoose          = require("mongoose"),
// Campground            = require("./models/campground"),
// Comment               = require("./models/comment");
//
// var data = [
//   {
//     name:"Lantang",
//     image:'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg',
//     des:"National Park",
//     moreDesc:"On the other hand, we denounce righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to  what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse"
//   },
//   {
//     name:"Antu",
//     image:'https://farm4.staticflickr.com/3138/2930534425_064ccd523b.jpg',
//     des:"Best Sunrise",
//     moreDesc:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid"
//   },
//   {
//     name:"Everest",
//     image:'https://farm2.staticflickr.com/1374/1353505263_a623a8d69b.jpg',
//     des:"Highest Mountain",
//     moreDesc:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid."
//   }
// ]
//
// function seedDB(){
//   //Remove ALL CAMPGROUNDS
//   Campground.remove({},function(err){
//     if(err){
//       console.log(err);
//     }
//     console.log("Removed CAMPGROUND");
//     //ADD FEW CampGround
//     data.forEach(function(seed){
//       Campground.create(seed,function(err,campground){
//         if(err){
//           console.log(err);
//         }
//         else{
//           console.log("ADDED CAMOGROUND");
//           //Create Commentss
//           Comment.create(
//             {
//               text:"This is Great Blah Blah Blah Blah",
//               author:"Sudip"
//             }
//           ,function(err,comment){
//             if(err){
//               console.log(err);
//             }
//             else {
//               campground.comments.push(comment);
//               campground.save();
//               console.log("Created New Comment");
//             }
//           });
//         }
//       });
//     });
//   });
// //ADD FEW COMMENTS
// }
//
// module.exports  = seedDB;
