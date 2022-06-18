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
    return service.findOne(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/service=:id", jsonParser, (req: any, res: any) => {
  try {
    return service.remove(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/service", jsonParser, (req: any, res: any) => {
  try {
    return service.insert(req.body.type, req.body.price).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/service", jsonParser, (req: any, res: any) => {
  try {
    return service
      .update(req.body.id, req.body.type, req.body.price)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
