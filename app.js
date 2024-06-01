
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Dive into my world where I share my thoughts, experiences, and passions. From daily musings to deep dives into my favorite topics, you'll find a mix of personal stories, insights, and reflections. Join me on this journey, and let's explore life together one post at a time.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ahmadmudasir:Test-1234@clustertodo.dljfwng.mongodb.net/BlogPostDB");

const postSchema  = {
  tittle : String,
  content : String
}

const Posts = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

  Posts.find({}).then(function(foundList){

    res.render("home", {
      tittle: "Home",
      Para1: homeStartingContent,
      newItems: foundList,
    })
  })
})

app.get("/contact", function (req, res) {

  res.render("contact", {
    tittle: "Contact",
    contentBody: contactContent
  })
})

app.get("/about", function (req, res) {

  res.render("about", {
    tittle: "About",
    aboutBody: aboutContent
  })
})

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
 const newPost = new Posts({
    tittle : _.upperCase(req.body.postTittle),
    content :  req.body.postBody
  })
  newPost.save();

  res.redirect("/");
})

app.get("/posts/:route", function (req, res) {

  let requestRoute = _.lowerCase(req.params.route);

  Posts.find({}).then(function(posts){
    posts.forEach(function (index) {
      let tittle = index.tittle;
      let storedTittle = _.lowerCase(index.tittle);
      let storedBody = index.content
      if (storedTittle === requestRoute) {
        res.render("post",
          {
            postTittle: tittle,
            postBody: storedBody,
            // route : requestRoute,
          })
      }
    })
  })

  
})

app.get("/Admin" , function(req,res) {

    res.render("admin");
 // res.send("Admin Login Under Maintainence Contact Administrator");

})




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
