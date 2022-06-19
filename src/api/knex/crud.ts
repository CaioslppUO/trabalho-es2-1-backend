import { database } from "./knex";
import { knex } from "knex";

export interface Crud {
  /**
   * Insert in table an object.
   * @param table Table to insert.
   * @param content Object to insert.
   * @returns The id of the inserted object.
   */
  insert: <Type>(table: string, content: Type) => Promise<{ id: number }>;

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @returns Query result.
   */
  remove: (table: string, id: number) => Promise<number>;

  /**
   * Remove an object from a table.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Query result.
   */
  removeNoPrimary: (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ) => Promise<number>;

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  find: (table: string) => Promise<any[]>;

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  findOne: (table: string, id: number) => Promise<any[]>;

  /**
   * Return on object from a table that has no primary id.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Object.
   */
  findOneNoPrimary: (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ) => Promise<any[]>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id Id of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  update: <Type>(table: string, id: number, content: Type) => Promise<number>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id_1 First id of the object.
   * @param id_2 Second id of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 First field to compare of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  updateNoPrimary: <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type
  ) => Promise<number>;

  /**
   * Select and return all objects from serviceOrder table.
   * @returns All objects from serviceOrder table.
   */
  findServiceOrder: () => Promise<any>;

  /**
   * Return on object from serviceOrder table.
   * @param id Id of the object.
   * @returns Object.
   */
  findOneServiceOrder: (id: number) => Promise<any[]>;

  /**
   * Select and return all objects from service table by OrderService.
   * @param id Id of the object.
   * @returns All objects from service table by OrderService.
   */
  findServiceByOrderService: (id: number) => Promise<any[]>;

  /**
   * Select and return all objects from service table by OrderService.
   * @returns All objects from service table order by model.
   */
  findRankServiceByModel: () => Promise<any[]>;

  /**
   * Return all ServiceOrders between beginDate and endDate.
   * @param beginDate First Date.
   * @param endDate Last Date.
   */
  totalServiceOrderByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return all ServiceOrders by client.
   * @returns ServiceOrders.
   */
  totalServiceOrderByClient: () => Promise<any[]>;

  /**
   * Return the total value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Total value from a service between a period
   */
  totalValueFromServicesByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return the average value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average value from a service between a period
   */
  averageValueFromServicesOrderByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;
}

export const Crud = (): Crud => {
  /**
   * Insert in table an object.
   * @param table Table to insert.
   * @param content Object to insert.
   * @returns The id of the inserted object.
   */
  const insert = <Type>(
    table: string,
    content: Type
  ): Promise<{ id: number }> => {
    return new Promise(async (resolve, rejects) => {
      await database(table)
        .insert(content)
        .then((res) => {
          resolve({ id: res[0] });
        })
        .catch(() => {
          rejects("could not insert");
        });
    });
  };

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @returns Query result.
   */
  const remove = (table: string, id: number): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where("id", Number(id))
        .del()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not remove");
        });
    });
  };

  /**
   * Remove an object from a table.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Query result.
   */
  const removeNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .del()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not remove");
        });
    });
  };

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  const find = (table: string): Promise<any> => {
    return new Promise(async (resolve) => {
      resolve(
        await database(table)
          .then((res) => res)
          .catch((err) => {
            throw new Error("could not find");
          })
      );
    });
  };

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  const findOne = (table: string, id: number): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where({ id: Number(id) })
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not find one");
        });
    });
  };

  /**
   * Return on object from a table that has no primary id.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Object.
   */
  const findOneNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not find one");
        });
    });
  };

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id Id of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  const update = <Type>(
    table: string,
    id: number,
    content: Type
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where("id", Number(id))
        .update(content)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id_1 First id of the object.
   * @param id_2 Second id of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 First field to compare of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  const updateNoPrimary = <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .update(content)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Select and return all objects from serviceOrder table.
   * @returns All objects from serviceOrder table.
   */
  const findServiceOrder = (): Promise<any> => {
    return new Promise(async (resolve) => {
      await database("ServiceOrder")
        .select(
          "c.name",
          "c.email",
          "c.cpf",
          "c.id as idClient",
          "ServiceOrder.id",
          "ServiceOrder.idPhone",
          "Phone.model as phoneModel"
        )
        .join("Client as c", "ServiceOrder.idClient", "c.id")
        .join("Phone", "ServiceOrder.idPhone", "Phone.id")
        .then((res) => resolve(res))
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Select and return one objects from serviceOrder table.
   * @param id Id of the object.
   * @returns All objects from serviceOrder table.
   */
  const findOneServiceOrder = (id: Number): Promise<any> => {
    return new Promise(async (resolve) => {
      await database("ServiceOrder")
        .select(
          "c.name",
          "c.email",
          "c.cpf",
          "c.id as idClient",
          "ServiceOrder.id",
          "ServiceOrder.idPhone",
          "Phone.model as phoneModel",
          "ServiceOrder.canceled as canceled",
          "ServiceOrder.beginDate as beginDate",
          "ServiceOrder.endDate as endDate"
        )
        .join("Client as c", "ServiceOrder.idClient", "c.id")
        .join("Phone", "ServiceOrder.idPhone", "Phone.id")
        .where({ "ServiceOrder.id": Number(id) })
        .then((res) => resolve(res))
        .catch((Err) => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Select and return all objects from service table by OrderService.
   * @param id Id of the object.
   * @returns All objects from service table by OrderService.
   */
  const findServiceByOrderService = (id: number): Promise<any> => {
    return new Promise(async (resolve) => {
      await database("ServiceOrderHasService")
        .select("Service.type", "Service.price", "Service.id")
        .join("Service", "ServiceOrderHasService.idService", "Service.id")
        .where({ "ServiceOrderHasService.idServiceOrder": Number(id) })
        .then((res) => resolve(res))
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Select and return all objects from service table by OrderService.
   * @returns All objects from service table order by model.
   */
  const findRankServiceByModel = (): Promise<any> => {
    return new Promise(async (resolve) => {
      await database
        .raw(
          "select *, (select count(*) from ServiceOrder where service.id = serviceorder.idClient) as OS from Service order by os desc limit 5;"
        )
        .then((res) => resolve(res))
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Return all ServiceOrders between beginDate and endDate.
   * @param beginDate First Date.
   * @param endDate Last Date.
   */
  const totalServiceOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database("ServiceOrder")
        .where("beginDate", ">=", beginDate)
        .andWhere("endDate", "<=", endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          throw new Error("could not get total service orders by period");
        });
    });
  };

  /**
   * Return all ServiceOrders by client.
   * @returns ServiceOrders.
   */
  const totalServiceOrderByClient = (): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database
        .raw(
          "SELECT Client.name AS Nome, (SELECT COUNT(*) FROM ServiceOrder WHERE Client.id = ServiceOrder.idClient) AS OS FROM Client"
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          throw new Error("could not get total service orders by client");
        });
    });
  };

  /**
   * Return the total value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Total value from a service between a period
   */
  const totalValueFromServicesByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database
        .raw(
          `SELECT *, (SELECT COUNT(*) FROM ServiceOrderHasService INNER JOIN ServiceOrder ON ServiceOrderHasService.idServiceOrder = ServiceOrder.id WHERE Service.id = ServiceOrderHasService.idService AND ServiceOrder.beginDate BETWEEN '${beginDate}' AND '${endDate}' AND ServiceOrder.endDate IS NOT NULL)*Service.price AS Rendimento from Service;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          throw new Error("could not get total value from service by period");
        });
    });
  };

  /**
   * Return the average value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average value from a service between a period
   */
  const averageValueFromServicesOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database
        .raw(
          `SELECT AVG((SELECT COUNT(*) FROM ServiceOrderHasService INNER JOIN ServiceOrder ON ServiceOrderHasService.idServiceOrder = ServiceOrder.id WHERE Service.id = ServiceOrderHasService.idService AND ServiceOrder.beginDate BETWEEN '${beginDate}' AND '${endDate}' AND ServiceOrder.endDate IS NULL)*Service.price) AS Media_Rendimento from Service;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          throw new Error("could not get average value from service by period");
        });
    });
  };

  return {
    findRankServiceByModel,
    findServiceByOrderService,
    findOneServiceOrder,
    findServiceOrder,
    insert,
    remove,
    removeNoPrimary,
    find,
    findOne,
    findOneNoPrimary,
    update,
    updateNoPrimary,
    totalServiceOrderByPeriod,
    totalServiceOrderByClient,
    totalValueFromServicesByPeriod,
    averageValueFromServicesOrderByPeriod,
  };
};
