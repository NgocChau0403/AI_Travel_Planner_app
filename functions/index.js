// functions/index.js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {GoogleGenerativeAI} = require("@google/generative-ai");
const app = express();
app.use(cors({origin: true}));

const genAI = new GoogleGenerativeAI("AIzaSyB8UX6oeb87D0BvCKobSFq4oZyvlC4f4N8");

app.post("/generate", async (req, res) => {
  const {prompt} = req.body;
  try {
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.status(200).json({result: text});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to generate content"});
  }
});

exports.api = functions.https.onRequest(app);
