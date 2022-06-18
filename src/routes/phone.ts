const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Phone } from "../api/phone/phone";

let phone = Phone();

router.get("/phone", jsonParser, (req: any, res: any) => {
  try {
    return phone.find().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/phone=:id", jsonParser, (req: any, res: any) => {
  try {
    return phone.findOne(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/phone=:id", jsonParser, (req: any, res: any) => {
  try {
    return phone.remove(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/phone", jsonParser, (req: any, res: any) => {
  try {
    return phone.insert(req.body.model).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/phone", jsonParser, (req: any, res: any) => {
  try {
    return phone.update(req.body.id, req.body.model).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/phoneModelsRank", jsonParser, (req: any, res: any) => {
  try {
    return phone.findModelsRank().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
