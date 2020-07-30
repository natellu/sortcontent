const app = require("express")();
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const {
  getRedditAccessToken,
  getSavedContent,
  unsaveContent,
} = require("./handlers/reddit");
app.post("/reddit/getRedditAccessToken", getRedditAccessToken);

app.post("/reddit/getSavedContent", getSavedContent);

app.post("/reddit/unsaveContent", unsaveContent);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`server started on port: ${port}`);
});
