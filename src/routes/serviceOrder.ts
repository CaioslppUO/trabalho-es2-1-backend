const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { ServiceOrder } from "../api/serviceOrder/serviceOrder";
import { ServiceOrderHasService } from "../api/serviceOrderHasService/serviceOrderHasService";

let serviceOrder = ServiceOrder();
let serviceOrderHasService = ServiceOrderHasService();

router.get("/serviceOrder", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrder.find().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/serviceOrder=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return serviceOrder.findOne(req.params.id).then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete("/serviceOrder=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("Could not id");
    return serviceOrder.remove(req.params.id).then((data) => {
      return res.status(200).json(data);
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
        return res.status(200).json(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/serviceOrder", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.idClient) return res.status(400).send("invalid idClient");
    if (!req.body.idPhone) return res.status(400).send("invalid idPhone");
    if (!req.body.beginDate) return res.status(400).send("invalid beginDate");
    if (!req.body.idsService) return res.status(400).send("invalid idsService");
    return serviceOrder
      .update(
        req.body.id,
        req.body.idClient,
        req.body.idPhone,
        req.body.beginDate
      )
      .then(async (data) => {
        await serviceOrderHasService.find().then(async (dt) => {
          for (let i = 0; i < dt.length; i++) {
            if (dt[i].idServiceOrder == req.body.id) {
              await serviceOrderHasService.remove(req.body.id, dt[i].idService);
            }
          }
        });
        for (let i = 0; i < req.body.idsService.length; i++) {
          await serviceOrderHasService.insert(
            req.body.id,
            req.body.idsService[i]
          );
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/averageServiceDuration", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrder.getAverageServiceDuration().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post(
  "/averageServiceOrderQuantityByPeriod",
  jsonParser,
  (req: any, res: any) => {
    try {
      if (!req.body.beginDate)
        return res.status(400).send("Could not beginDate");
      if (!req.body.endDate) return res.status(400).send("Could not endDate");
      return serviceOrder
        .getAverageServiceOrderQuantityByPeriod(
          req.body.beginDate,
          req.body.endDate
        )
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
);

router.post(
  "/averageValueFromServiceOrderByPeriod",
  jsonParser,
  (req: any, res: any) => {
    try {
      if (!req.body.beginDate)
        return res.status(400).send("Could not beginDate");
      if (!req.body.endDate) return res.status(400).send("Could not endDate");
      return serviceOrder
        .getAverageValueFromServicesOrderByPeriod(
          req.body.beginDate,
          req.body.endDate
        )
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
);

router.post(
  "/totalValueFromServicesByPeriod",
  jsonParser,
  (req: any, res: any) => {
    try {
      if (!req.body.beginDate)
        return res.status(400).send("Could not beginDate");
      if (!req.body.endDate) return res.status(400).send("Could not endDate");
      return serviceOrder
        .getTotalValueFromServicesByPeriod(req.body.beginDate, req.body.endDate)
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
);

router.get("/totalServiceOrderByClient", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrder.getTotalServiceOrderByClient().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/totalServiceOrderByPeriod", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.beginDate) return res.status(400).send("Could not beginDate");
    if (!req.body.endDate) return res.status(400).send("Could not endDate");
    return serviceOrder
      .getTotalServiceOrderByPeriod(req.body.beginDate, req.body.endDate)
      .then((data) => {
        return res.status(200).json(data);
      });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/prevision", jsonParser, (req: any, res: any) => {
  try {
    return serviceOrder.prevision().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
