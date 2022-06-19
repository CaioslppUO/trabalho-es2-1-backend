const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { ServiceOrder } from "../api/serviceOrder/serviceOrder";

let serviceOrder = ServiceOrder();

router.get("/serviceOrder", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrder.find().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/serviceOrder=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return serviceOrder.findOne(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/serviceOrder=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return serviceOrder.remove(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/serviceOrder", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.idClient) return res.status(400).send("Could not idClient");
    if (!req.body.idPhone) return res.status(400).send("Could not idPhone");
    if (!req.body.services) return res.status(400).send("Could not services");
    if (!req.body.beginDate) return res.status(400).send("Could not beginDate");
    return serviceOrder
      .insert(
        req.body.idClient,
        req.body.idPhone,
        req.body.services,
        req.body.beginDate
      )
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/serviceOrder", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("Could not id");
    if (!req.body.idClient) return res.status(400).send("Could not idClient");
    if (!req.body.idPhone) return res.status(400).send("Could not idPhone");
    if (!req.body.beginDate) return res.status(400).send("Could not beginDate");
    return serviceOrder
      .update(
        req.body.id,
        req.body.idClient,
        req.body.idPhone,
        req.body.beginDate
      )
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
