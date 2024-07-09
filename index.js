import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let postId = 1;

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts.slice().reverse() });
});

app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.post("/submit", (req, res) => {
  const postTitle = req.body["pTitle"];
  const postBody = req.body["pBody"];

  // Add the new post to the posts array
  posts.push({
    id: postId++,
    title: postTitle,
    body: postBody,
  });

  // Render the index page with the updated posts array
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postIdToDelete = parseInt(req.body.id);
  posts = posts.filter((post) => post.id !== postIdToDelete);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const postIdToEdit = parseInt(req.body.id);
  const newTitle = req.body.title;
  const newBody = req.body.body;

  const post = posts.find((post) => post.id === postIdToEdit);
  if (post) {
    post.title = newTitle;
    post.body = newBody;
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
