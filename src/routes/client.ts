const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Client } from "../api/client/client";

let client = Client();

router.get("/client", jsonParser, (req: any, res: any) => {
  try {
    return client
      .find()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/client=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return client.findOne(req.params.id).then((data) => {
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/client=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return client.remove(req.params.id).then((data) => {
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/client", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.name) return res.status(400).send("Could not name");
    if (!req.body.email) return res.status(400).send("Could not email");
    if (!req.body.cpf) return res.status(400).send("Could not cpf");
    return client
      .insert(req.body.name, req.body.email, req.body.cpf)
      .then((data) => {
        return res.status(200).json(data);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/client", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("Could not id");
    if (!req.body.name) return res.status(400).send("Could not name");
    if (!req.body.email) return res.status(400).send("Could not email");
    if (!req.body.cpf) return res.status(400).send("Could not cpf");
    return client
      .update(req.body.id, req.body.name, req.body.email, req.body.cpf)
      .then((data) => {
        return res.status(200).json(data);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});
