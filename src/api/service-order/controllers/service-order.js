"use strict";

/**
 *  service-order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::service-order.service-order",
  () => ({
    async findOne(args) {
      args.query = { ...args.query, local: "en" };
      const { data, meta } = await super.findOne(args);
      let total = 0;
      data.attributes.services.data.forEach((result) => {
        total = total + result.attributes.price;
      });

      return { data, TotalOrderPrice: total };
    },
  })
);
