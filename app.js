import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) =>{
    res.render("index1.ejs", {posts: posts})
});
app.get("/about", (req, res) =>{
    res.render("about.ejs");
});
app.get("/contact", (req, res) =>{
    res.render("contact.ejs");
});

app.post("/", (req, res) =>{
    let post = {
        title: req.body.postTitle,
        content: req.body.postContent
    }
    posts.push(post);
    console.log(posts);
    res.redirect("/")
});

app.post("/remove/:index", (req, res) =>{
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
      posts.splice(index, 1); 
    }
    res.redirect("/");
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});