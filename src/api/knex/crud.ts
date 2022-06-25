import { database } from "./knex";
import { knex } from "knex";

export interface Crud {
  /**
   * Insert in table an object.
   * @param table Table to insert.
   * @param content Object to insert.
   * @param forceRollBack Force the inserted object to suffer rollback.
   * @returns The id of the inserted object.
   */
  insert: <Type>(
    table: string,
    content: Type,
    forceRollBack?: boolean
  ) => Promise<{ id: number }>;

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @param forceRollBack Force the removed object to suffer rollback.
   * @returns Query result.
   */
  remove: (
    table: string,
    id: number,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Remove an object from a table.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @param forceRollBack Force the removed object to suffer rollback.
   * @returns Query result.
   */
  removeNoPrimary: (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    forceRollBack?: boolean
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
   * @param forceRollBack Force the updated object to suffer rollback.
   * @returns Query result.
   */
  update: <Type>(
    table: string,
    id: number,
    content: Type,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id_1 First id of the object.
   * @param id_2 Second id of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 First field to compare of the object.
   * @param content Content to update the object.
   * @param forceRollBack Force the updated object to suffer rollback.
   * @returns Query result.
   */
  updateNoPrimary: <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type,
    forceRollBack?: boolean
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

  /**
   * Return the average quantity from a service order between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average quantity from a service order between a period
   */
  averageServiceOrderQuantityByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return the average service duration.
   * @returns Average service duration.
   */
  averageServiceDuration: () => Promise<any[]>;
}

export const Crud = (): Crud => {
  const insert = <Type>(
    table: string,
    content: Type,
    forceRollBack: boolean = false
  ): Promise<{ id: number }> => {
    return new Promise(async (resolve, rejects) => {
      await database.transaction((t) => {
        t(table)
          .insert(content)
          .then((res) => {
            if (forceRollBack) t.rollback();
            else t.commit();
            resolve({ id: res[0] });
          })
          .catch(() => {
            t.rollback();
            rejects("could not insert");
          });
      });
    });
  };

  const remove = (
    table: string,
    id: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await database.transaction((t) => {
        t(table)
          .where("id", Number(id))
          .del()
          .then((res) => {
            if (forceRollBack) t.rollback();
            else t.commit();
            resolve(res);
          })
          .catch(() => {
            t.rollback();
            rejects("could not remove");
          });
      });
    });
  };

  const removeNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await database.transaction((t) => {
        t(table)
          .where(`${field_1}`, Number(id_1))
          .andWhere(`${field_2}`, Number(id_2))
          .del()
          .then((res) => {
            if (forceRollBack) t.rollback();
            else t.commit();
            resolve(res);
          })
          .catch(() => {
            t.rollback();
            rejects("could not remove");
          });
      });
    });
  };

  const find = (table: string): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      resolve(
        await database(table)
          .then((res) => res)
          .catch((err) => {
            rejects("could not find");
          })
      );
    });
  };

  const findOne = (table: string, id: number): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database(table)
        .where({ id: Number(id) })
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          rejects("could not find one");
        });
    });
  };

  const findOneNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          rejects("could not find one");
        });
    });
  };

  const update = <Type>(
    table: string,
    id: number,
    content: Type,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await database.transaction((t) => {
        t(table)
          .where("id", Number(id))
          .update(content)
          .then((res) => {
            if (forceRollBack) t.rollback();
            else t.commit();
            resolve(res);
          })
          .catch(() => {
            t.rollback();
            rejects("could not update");
          });
      });
    });
  };

  const updateNoPrimary = <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await database.transaction((t) => {
        t(table)
          .where(`${field_1}`, Number(id_1))
          .andWhere(`${field_2}`, Number(id_2))
          .update(content)
          .then((res) => {
            if (forceRollBack) t.rollback();
            else t.commit();
            resolve(res);
          })
          .catch(() => {
            t.rollback();
            rejects("could not update");
          });
      });
    });
  };

  /**
   * Select and return all objects from serviceOrder table.
   * @returns All objects from serviceOrder table.
   */
  const findServiceOrder = (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
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
        .then((res) => resolve(res))
        .catch(() => {
          rejects("could not update");
        });
    });
  };

  /**
   * Select and return one objects from serviceOrder table.
   * @param id Id of the object.
   * @returns All objects from serviceOrder table.
   */
  const findOneServiceOrder = (id: Number): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
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
        .catch(() => {
          rejects("could not update");
        });
    });
  };

  /**
   * Select and return all objects from service table by OrderService.
   * @param id Id of the object.
   * @returns All objects from service table by OrderService.
   */
  const findServiceByOrderService = (id: number): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      await database("ServiceOrderHasService")
        .select("Service.type", "Service.price", "Service.id")
        .join("Service", "ServiceOrderHasService.idService", "Service.id")
        .where({ "ServiceOrderHasService.idServiceOrder": Number(id) })
        .then((res) => resolve(res))
        .catch(() => {
          rejects("could not update");
        });
    });
  };

  /**
   * Select and return all objects from service table by OrderService.
   * @returns All objects from service table order by model.
   */
  const findRankServiceByModel = (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          "select *, (select count(*) from ServiceOrder where service.id = serviceorder.idClient) as OS from Service order by os desc limit 5;"
        )
        .then((res) => resolve(res))
        .catch(() => {
          rejects("could not update");
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
    return new Promise(async (resolve, rejects) => {
      await database("ServiceOrder")
        .where("beginDate", ">=", beginDate)
        .andWhere("endDate", "<=", endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects("could not get total service orders by period");
        });
    });
  };

  /**
   * Return all ServiceOrders by client.
   * @returns ServiceOrders.
   */
  const totalServiceOrderByClient = (): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          "SELECT Client.name AS Nome, (SELECT COUNT(*) FROM ServiceOrder WHERE Client.id = ServiceOrder.idClient) AS OS FROM Client"
        )
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          rejects("could not get total service orders by client");
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
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          `SELECT *, (SELECT COUNT(*) FROM ServiceOrderHasService INNER JOIN ServiceOrder ON ServiceOrderHasService.idServiceOrder = ServiceOrder.id WHERE Service.id = ServiceOrderHasService.idService AND ServiceOrder.beginDate BETWEEN '${beginDate}' AND '${endDate}' AND ServiceOrder.endDate IS NOT NULL)*Service.price AS Rendimento from Service;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects("could not get total value from service by period");
        });
    });
  };

  /**
   * Return the average value from all service orders between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average value from all service orders between a period
   */
  const averageValueFromServicesOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          `SELECT AVG((SELECT COUNT(*) FROM ServiceOrderHasService INNER JOIN ServiceOrder ON ServiceOrderHasService.idServiceOrder = ServiceOrder.id WHERE Service.id = ServiceOrderHasService.idService AND ServiceOrder.beginDate BETWEEN '${beginDate}' AND '${endDate}' AND ServiceOrder.endDate IS NULL)*Service.price) AS Media_Rendimento from Service;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects("could not get average value from service order by period");
        });
    });
  };

  /**
   * Return the average quantity from a service order between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average quantity from a service order between a period
   */
  const averageServiceOrderQuantityByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          `SELECT SUM((SELECT COUNT(*) FROM ServiceOrderHasService INNER JOIN ServiceOrder ON ServiceOrderHasService.idServiceOrder = ServiceOrder.id WHERE Service.id = ServiceOrderHasService.idService AND ServiceOrder.beginDate BETWEEN '${beginDate}' AND '${endDate}' AND ServiceOrder.endDate IS NULL)) * 1.0 / (select count(*) from ServiceOrder where beginDate between '${beginDate}' AND '${endDate}') AS media_servicos from Service;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(
            "could not get average quantity from service order by period"
          );
        });
    });
  };

  /**
   * Return the average service duration.
   * @returns Average service duration.
   */
  const averageServiceDuration = (): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(
          `SELECT AVG(((JulianDay(ServiceOrder.endDate) - JulianDay(ServiceOrder.beginDate)))) AS media, res.idService FROM ServiceOrder INNER JOIN (SELECT * FROM Service INNER JOIN ServiceOrderHasService ON Service.id = ServiceOrderHasService.idService) AS res ON ServiceOrder.id = res.idServiceOrder WHERE ServiceOrder.endDate IS NOT NULL GROUP BY res.idService;`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(
            "could not get average quantity from service order by period"
          );
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
    averageServiceOrderQuantityByPeriod,
    averageServiceDuration,
  };
};
