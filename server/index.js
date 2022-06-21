const express = require("express");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
// const connectDb = require("./config/connection");
const app = express();
const path = require("path");
const cors = require("cors");
// const helmet = require("helmet");
const http = require("http");
const webpush = require("web-push");

const { uploadall } = require("./helpers/filehelper");

app.use(cors());

// app.use(helmet());

const publicVapidKey =
  "BPcQiemsAeAbDOaReR2_FrWa_ein5LpXuOu9z2nmvUkVQYuv3J-AHHLlMRpBlByxviZf8DLqFGD6A0BcUZtVotM";
const privateVapidKey = "5kTU_FjFI6CPlR_E6yVc_VeJOhM1f5nXonSarN_FmJg";

//setting vapid keys details
webpush.setVapidDetails(
  "mailto:qmuhammad144@gmail.com",
  publicVapidKey,
  privateVapidKey
);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _dirname = path.resolve();
app.use("uploads", express.static(path.join(_dirname, "uploads")));

const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      // file.mimetype == "image/png" ||
      // file.mimetype == "image/jpg" ||
      // file.mimetype == "image/jpeg" ||
      // file.mimetype == "video/webm" ||
      // file.mimetype == "video/mp4" ||
      // file.mimetype == "video/mav"

      file
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      return cb(new Error("File is required"));
    }
  },
});

app.use("/uploads", express.static(path.join(_dirname, "uploads")));

// Frontend Site Login System
// let Authenticate = require("./routes/Autherize/autherize");

// app.post("/register", Authenticate.register);
// app.get("/verify-email", Authenticate.verifyEmail);
// app.post("/authenticate", Authenticate.authenticate);
// app.post("/forgot-password", Authenticate.forgotPassword);
// app.post("/VerifyTokenforpass", Authenticate.verifyCode);
// app.post("/resetpassword", Authenticate.resetPassword);

// app.post("/getcurrentUser", Authenticate.currentUser);

// //Admin Dashboard SiteData Changes
// ///////////////////////////////////////////////////////////////////////////////////////////

// let Admindash = require("./routes/adminDashboard/adminDashboard");

// app.post("/setGeneral", upload.single("image"), Admindash.setGeneral);
// app.get("/getGeneralsett", Admindash.getGeneral);
// app.post("/setSocialLinks", Admindash.setSocialLinks);
// app.get("/getSocialLinks", Admindash.getSocialLinks);

// app.post("/setHomeBanner", upload.single("image"), Admindash.setHomeBanner);
// app.get("/getHomeBanner", Admindash.getHomeBanner);
// /////////////////////////////////////////////////////////////////
// app.post("/setNftPromote", uploadall.array("files"), Admindash.setNftPromote);
// app.get("/getNftPromoteRefresh", Admindash.getNftPromote);

// app.post("/setNftPopular", uploadall.array("files"), Admindash.setNftPopular);
// app.get("/getNftPopularRefresh", Admindash.getNftPopular);

// app.post("/setNftRecent", uploadall.array("files"), Admindash.setNftRecent);
// app.get("/getNftRecentRefresh", Admindash.getNftRecent);

// app.post("/setNftBanner", uploadall.array("files"), Admindash.setNftBanner);
// app.get("/getNftBannerRefresh", Admindash.getNftBanner);

// app.post("/updateAboutUs", Admindash.updateAboutUs);
// app.get("/getAboutUsRefresh", Admindash.getAboutUs);

// app.post("/setHomeDocs", upload.single("image"), Admindash.setHomeDocs);
// app.get("/getHomeDocsRefresh", Admindash.getHomeDocs);
// app.get("/getHomeDocsbyid", Admindash.getHomeDocsbyid);

// app.post("/setDocsHeading", Admindash.setDocsHeading);
// app.get("/getDocsHeadingRefresh", Admindash.getDocsHeading);

// app.post("/setHomeDocsHeading", Admindash.setHomeDocsHead);

// ///////////////////////////////
// let AddServices = require("./routes/Homeservices/services");

// app.post("/addService", upload.single("image"), AddServices.addService);
// app.get("/getService", AddServices.getService);
// app.post("/deleteService", AddServices.deleteServiceByid);
// app.post("/updateService", upload.single("image"), AddServices.updateService);
// app.get("/getServiceByid", AddServices.getServicebyid);

// ///////////////////////////////
// let Teams = require("./routes/TeamMember/team");

// app.post("/addMember", upload.single("image"), Teams.addMember);
// app.get("/getMember", Teams.getMember);
// app.post("/deleteMember", Teams.deleteMemberByid);
// app.post("/updateMember", upload.single("image"), Teams.updateMember);
// app.get("/getMemberByid", Teams.getMemberByid);

// ///////////////////////////////
// let SiteBlogs = require("./routes/Blogs/blogs");

// app.post("/addBlog", upload.single("image"), SiteBlogs.addBlog);
// app.get("/getBlog", SiteBlogs.getBlog);
// app.post("/deleteBlog", SiteBlogs.deleteBlogByid);
// app.post("/updateBlog", upload.single("image"), SiteBlogs.updateBlog);
// app.get("/getBlogByid", SiteBlogs.getBlogByid);

// ///////////////////////////////
// let SiteRoadMap = require("./routes/RoadMap/Roadmap");

// app.post("/addRoadmap", upload.single("image"), SiteRoadMap.addRoadmap);
// app.get("/getRoadmap", SiteRoadMap.getRoadmap);
// app.post("/deleteRoadmap", SiteRoadMap.deleteRoadmapByid);
// app.post("/updateRoadmap", upload.single("image"), SiteRoadMap.updateRoadmap);
// app.get("/getRoadmapByid", SiteRoadMap.getRoadmapByid);

// ///////////////////////////////
// let SiteTokenomics = require("./routes/Tokenomics/Tokenomics");

// app.post(
//   "/addTokenomics",
//   upload.single("image"),
//   SiteTokenomics.addTokenomics
// );
// app.get("/getTokenomics", SiteTokenomics.getTokenomics);
// app.post("/deleteTokenomics", SiteTokenomics.deleteTokenomicsByid);
// app.post(
//   "/updateTokenomics",
//   upload.single("image"),
//   SiteTokenomics.updateTokenomics
// );
// app.get("/gettockenomicsByid", SiteTokenomics.gettockenomicsByid);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  const payload = JSON.stringify({ title: "push test by Qasim" });
  // console.log(req.body.subscription);
  webpush.sendNotification(req.body.subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});
///////////////////////////////////////
app.use(express.static("./build"));

// app.use("*", (req, res) => {
//   res.sendfile("./build/index.html");
// });

// connectDb();

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
  console.log("server is listning on port " + PORT);
});
