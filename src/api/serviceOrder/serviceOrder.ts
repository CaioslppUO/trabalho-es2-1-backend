import { Crud } from "../knex/crud";
import { Phone } from "../phone/phone";
import { Client } from "../client/client";
import { resolve } from "path";

/**
 * Database ServiceOrder interface.
 */
interface ServiceOrderObject {
  idClient: number;
  idPhone: number;
  beginDate: string;
}

export interface ServiceOrder {
  /**
   * Insert a new ServiceOrder in the database.
   * @param idClient Id of the Client.
   * @param idPhone Id of the Phone.
   * @param beginDate Creation date of the service order.
   * @returns The id of the inserted ServiceOrder.
   */
  insert: (
    idClient: number,
    idPhone: number,
    services: Array<Number>,
    beginDate: string
  ) => Promise<{ id: number }>;

  /**
   * Remove a ServiceOrder from the database.
   * @param id ServiceOrder id
   * @returns True if were able to remove.
   */
  remove: (id: number) => Promise<boolean>;

  /**
   * Return every ServiceOrder in the database.
   * @returns ServiceOrders in the database.
   */
  find: () => Promise<any[]>;

  /**
   * Return a ServiceOrder from the database.
   * @param id ServiceOrder id.
   * @returns ServiceOrder.
   */
  findOne: (id: number) => Promise<any[]>;

  /**
   * Update an ServiceOrder in the database.
   * @param id ServiceOrder id.
   * @param idClient New Client id.
   * @param idPhone New Phone id.
   * @param beginDate New creation date.
   * @returns True if could update the ServiceOrder.
   */
  update: (
    id: number,
    idClient: number,
    idPhone: number,
    beginDate: string
  ) => Promise<boolean>;

  /**
   * Return all ServiceOrders between beginDate and endDate.
   * @param beginDate First Date.
   * @param endDate Last Date.
   * @returns ServiceOrders between beginDate and endDate
   */
  getTotalServiceOrderByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return all ServiceOrders by client.
   * @returns ServiceOrders.
   */
  getTotalServiceOrderByClient: () => Promise<any[]>;

  /**
   * Return the total value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Total value from a service between a period
   */
  getTotalValueFromServicesByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return the average value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average value from a service between a period
   */
  getAverageValueFromServicesOrderByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;

  /**
   * Return the average quantity from a service order between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average quantity from a service order between a period
   */
  getAverageServiceOrderQuantityByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<any[]>;
}

export const ServiceOrder = (): ServiceOrder => {
  const crud = Crud();

  /**
   * Insert a new ServiceOrder in the database.
   * @param idClient Id of the Client.
   * @param idPhone Id of the Phone.
   * @param beginDate Creation date of the service order.
   * @returns The id of the inserted ServiceOrder.
   */
  const insert = async (
    idClient: number,
    idPhone: number,
    services: Array<Number>,
    beginDate: string
  ): Promise<{ id: number }> => {
    return new Promise(async (resolve, rejects) => {
      let phone = Phone();
      const p = await phone.findOne(idPhone);
      if (p.length <= 0) rejects("phone doesn't exist");
      let client = Client();
      let c = await client.findOne(idClient);
      if (c.length <= 0) rejects("client doesn't exist");
      let { id } = await crud.insert("ServiceOrder", {
        idClient,
        idPhone,
        beginDate,
      });
      try {
        for (let i = 0; i < services.length; i++) {
          await crud.insert("serviceOrderHasService", {
            idServiceOrder: Number(id),
            idService: services[i],
          });
        }
      } catch (error) {
        rejects(error);
      }
      resolve({ id: id });
    });
  };

  /**
   * Remove a ServiceOrder from the database.
   * @param id ServiceOrder id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("ServiceOrder", id)
        .then((res) => {
          res[0].canceled = true;
          crud
            .update("ServiceOrder", id, res[0])
            .then(() => {
              resolve(true);
            })
            .catch((err) => {
              rejects(err);
            });
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return every ServiceOrder in the database.
   * @returns ServiceOrders in the database.
   */
  const find = (): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      try {
        crud
          .findServiceOrder()
          .then((res: any) => {
            crud
              .findServiceByOrderService(res[0].id)
              .then((data) => {
                res[0].services = data;
                resolve(res);
              })
              .catch((err) => {
                rejects(err);
              });
          })
          .catch((err) => {
            rejects(err);
          });
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Return a ServiceOrder from the database.
   * @param id ServiceOrder id.
   * @returns ServiceOrder.
   */
  const findOne = (id: number): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOneServiceOrder(id)
        .then((res: any) => {
          if (res.length > 0)
            crud
              .findServiceByOrderService(res[0].id)
              .then((data) => {
                if (data.length > 0) res[0].services = data;
                else res[0].services = [];
                resolve(res);
              })
              .catch((err) => {
                rejects(err);
              });
          else resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Update an ServiceOrder in the database.
   * @param id ServiceOrder id.
   * @param idClient New Client id.
   * @param idPhone New Phone id.
   * @param beginDate New creation date.
   * @returns True if could update the ServiceOrder.
   */
  const update = (
    id: number,
    idClient: number,
    idPhone: number,
    beginDate: string
  ): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      let new_ServiceOrder: ServiceOrderObject = {
        idClient,
        idPhone,
        beginDate,
      };
      crud
        .update("ServiceOrder", id, new_ServiceOrder)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return all ServiceOrders between beginDate and endDate.
   * @param beginDate First Date.
   * @param endDate Last Date.
   * @returns ServiceOrders between beginDate and endDate
   */
  const getTotalServiceOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .totalServiceOrderByPeriod(beginDate, endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return all ServiceOrders by client.
   * @returns ServiceOrders.
   */
  const getTotalServiceOrderByClient = (): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .totalServiceOrderByClient()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return the total value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Total value from a service between a period
   */
  const getTotalValueFromServicesByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .totalValueFromServicesByPeriod(beginDate, endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return the average value from a service between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average value from a service between a period
   */
  const getAverageValueFromServicesOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .averageValueFromServicesOrderByPeriod(beginDate, endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return the average quantity from a service order between a period.
   * @param beginDate First date.
   * @param endDate Second date.
   * @returns Average quantity from a service order between a period
   */
  const getAverageServiceOrderQuantityByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .averageServiceOrderQuantityByPeriod(beginDate, endDate)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  return {
    insert,
    remove,
    find,
    findOne,
    update,
    getTotalServiceOrderByPeriod,
    getTotalServiceOrderByClient,
    getTotalValueFromServicesByPeriod,
    getAverageValueFromServicesOrderByPeriod,
    getAverageServiceOrderQuantityByPeriod,
  };
};
