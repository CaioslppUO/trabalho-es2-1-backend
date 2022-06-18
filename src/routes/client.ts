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
        return res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/client=:id", jsonParser, (req: any, res: any) => {
  try {
    return client.findOne(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/client=:id", jsonParser, (req: any, res: any) => {
  try {
    return client.remove(req.params.id).then((data) => {
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/client", jsonParser, (req: any, res: any) => {
  try {
    return client
      .insert(req.body.name, req.body.email, req.body.cpf)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/client", jsonParser, (req: any, res: any) => {
  try {
    return client
      .update(req.body.id, req.body.name, req.body.email, req.body.cpf)
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
