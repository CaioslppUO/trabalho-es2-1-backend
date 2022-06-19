const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Service } from "../api/service/service";

let service = Service();

router.get("/service", jsonParser, (req: any, res: any) => {
  try {
    return service.find().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/service=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return service.findOne(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/rankServiceByModel", jsonParser, (req: any, res: any) => {
  try {
    return service.findRankServiceByModel().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/service=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return service.remove(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/service", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.type) return res.status(400).send("Could not type");
    if (!req.body.price) return res.status(400).send("Could not price");
    return service.insert(req.body.type, req.body.price).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/service", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("Could not id");
    if (!req.body.type) return res.status(400).send("Could not type");
    if (!req.body.price) return res.status(400).send("Could not price");
    return service
      .update(req.body.id, req.body.type, req.body.price)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
