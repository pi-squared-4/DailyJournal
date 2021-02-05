//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "... because days are expensive.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/" , function(req, res){

  res.render("home", {
    homeStartingContent : homeStartingContent,
    posts: posts,
  });
});

app.get("/about" , function(req , res){
  res.render("about" , {
    aboutContent: aboutContent,
  })
});

app.get("/contact", function(req , res){
  res.render("contact" , {
    contactContent: contactContent,
  })

});

app.get("/compose" , function(req , res){
  res.render("compose");
})

app.get("/posts/:postName" , function(req , res){
  // console.log(req.params.postName);
  // console.log(posts.length);
  const requestedTitle = _.lowerCase(req.params.postName);
  for (var i = 0 ; i < posts.length ; i++){
    if (requestedTitle === _.lowerCase(posts[i].title)){
      // console.log("Match Found");
      res.render("post" , {
        title: posts[i].title,
        content: posts[i].body,
      })
      break;
    }
  }


})

app.post("/" , function(req , res){
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  }
  posts.push(post);
  res.redirect("/");
  // console.log(posts);
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
