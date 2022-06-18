const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { ServiceOrderHasService } from "../api/serviceOrderHasService/serviceOrderHasService";

let serviceOrderHasService = ServiceOrderHasService();

router.get("/serviceOrderHasService/all", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrderHasService.find().then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/serviceOrderHasService", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrderHasService
      .findOne(req.body.idServiceOrder, req.body.idService)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/serviceOrderHasService", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrderHasService
      .remove(req.body.idServiceOrder, req.body.idService)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/serviceOrderHasService", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrderHasService
      .insert(req.body.idServiceOrder, req.body.idService)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/serviceOrderHasService", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrderHasService
      .update(
        req.body.oldIdServiceOrder,
        req.body.oldIdService,
        req.body.newIdServiceOrder,
        req.body.newIdService
      )
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
