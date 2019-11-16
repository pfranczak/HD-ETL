import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import database from "./database";
import {getDataFromUrl} from "./etl";

const main = async () => {
  await database.init();
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors())

  app.post("/extract", async function(req, res) {
    const extractedData = await getDataFromUrl();
    await database.insertExtracted(extractedData.map(url => ({url})));
    res.send({ extractedAmount: extractedData.length });
  });

  app.post("/transformed", async function(req, res) {
  });

  app.delete("/transformed", async function(req, res) {
  });

  app.delete("/extraced", async function(req, res) {
  });

  app.get("/transformed", async function(req, res) {
  });

  const server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
  });
};


main()
