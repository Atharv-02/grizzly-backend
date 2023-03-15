//JWT TOKEN PINATA - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzdmZTcxYi0xYjUzLTQ2NWYtODA1NC04MTA2ZGZmNGM1NGMiLCJlbWFpbCI6Im1lYXRoYXJ2Z3VsYXRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmZWJiOWZkYTg3MWE1NDFjOTRlNiIsInNjb3BlZEtleVNlY3JldCI6IjkxZTVkOWEwMzcyNTE5ZDEwYzNmYTc5NzU0ZGQzNzYyNDU1ZmY0ODZjYTE1YjYzNjc5NTU4MTYxZTIwZTM0NjAiLCJpYXQiOjE2Nzg2MzA5MDN9.bGv32ui6F_JBAVuaE5E1nen723cE496wkSRKDzLxnEo
const express = require("express");
var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const app = express();
// const ObjectId = require("mongodb").ObjectId;
const ObjectID = require("mongodb").ObjectId;
const axios = require("axios");
const hashes = require("./models/tasks");
require("dotenv").config();
const connectDB = require("./db/connect");
const cors = require("cors");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(
  "febb9fda871a541c94e6",
  "91e5d9a0372519d10c3fa79754dd3762455ff486ca15b63679558161e20e3460"
);
app.use(cors());

// body parser configuration
app.use(express.json());

app.post("/send", async (req, res) => {
  const body = req.body;
  var data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataContent: {
      metaData: req.body,
    },
  });

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzdmZTcxYi0xYjUzLTQ2NWYtODA1NC04MTA2ZGZmNGM1NGMiLCJlbWFpbCI6Im1lYXRoYXJ2Z3VsYXRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4NDYyMWIyN2EzYzczMGJhYWY0ZiIsInNjb3BlZEtleVNlY3JldCI6ImRkYTkzMGM1ZGQ4MjZjMjYyNzYyODg5MzIzMTMxOWUwYzkwYzgxODQzZWQxODQ0ZmY1OWU5YWI0M2ViYzdiYmUiLCJpYXQiOjE2Nzg2NDA5ODR9.RvGiN9rhas96wH9yYQ7m1C1QWEUmn5WFubfzoRsKyJU",
    },
    data: data,
  };

  const result = await axios(config);

  console.log(result.data);

  res.send(result.data);
});
app.post("/delete", async (req, res) => {
  var config = {
    method: "delete",
    url: "https://api.pinata.cloud/pinning/unpin/CID",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzdmZTcxYi0xYjUzLTQ2NWYtODA1NC04MTA2ZGZmNGM1NGMiLCJlbWFpbCI6Im1lYXRoYXJ2Z3VsYXRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmZWJiOWZkYTg3MWE1NDFjOTRlNiIsInNjb3BlZEtleVNlY3JldCI6IjkxZTVkOWEwMzcyNTE5ZDEwYzNmYTc5NzU0ZGQzNzYyNDU1ZmY0ODZjYTE1YjYzNjc5NTU4MTYxZTIwZTM0NjAiLCJpYXQiOjE2Nzg2MzA5MDN9.bGv32ui6F_JBAVuaE5E1nen723cE496wkSRKDzLxnEo",
    },
  };
  const result = await axios(config);
  console.log(result);
  res.send("hello");
});
app.get("/all-nft", async (req, res) => {
  const allHash = await hashes.find({});
  const sendData = allHash.map((hashed) => {
    return {
      _id: hashed._id,
      uri: `https://gateway.pinata.cloud/ipfs/${hashed.hash}`,
    };
  });

  res.json(sendData);
});
app.get("/single-nft/:id", async (req, res) => {
  const { id: taskID } = req.params;
  console.log(taskID);
  const task = await hashes.findOne({ _id: new ObjectID(taskID) });
  console.log(taskID);
  res.send("singleHash");
});
const port = 5500;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("server is listening on port", port));
  } catch (error) {
    console.log(error);
  }
};
start();
