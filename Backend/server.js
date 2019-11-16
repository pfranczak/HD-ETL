import express from 'express';
import bodyParser from 'body-parser';
import database from "./database";
import {
  getDataFromUrl,
  getOfferData
} from "./etl";

const main = async () => {
  await database.init();
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/extract", async function(req, res) {
    const extractedData = await getDataFromUrl();
    await database.insertExtracted(extractedData.map(url => ({url})));
    res.send(200);
  });

  app.post("/transformed", async function(req, res) {
    const extractedData = await database.getExtracted();
    const transformedData = extractedData.map(({url}) => getOfferData(url));
    await database.insertTransformed(transformedData);
    res.send(200);
  });

  app.delete("/transformed", async function(req, res) {
  });

  app.delete("/extraced", async function(req, res) {
  });

  app.get("/transformed", async function(req, res) {
  });

  const server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
  });
};


main()
