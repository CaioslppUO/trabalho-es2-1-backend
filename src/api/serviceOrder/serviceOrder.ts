import { Crud } from "../knex/crud";
import { Phone } from "../phone/phone";
import { Client } from "../client/client";
import { Service } from "../service/service";

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
   * @param forceRollBack Force the insert to suffer rollback.
   * @returns The id of the inserted ServiceOrder.
   */
  insert: (
    idClient: number,
    idPhone: number,
    services: Array<Number>,
    beginDate: string,
    forceRollBack?: boolean
  ) => Promise<{ id: number }>;

  /**
   * Remove a ServiceOrder from the database.
   * @param id ServiceOrder id
   * @param forceRollBack Force the remove to suffer rollback.
   * @returns True if were able to remove.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

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
   * @param forceRollBack Force the update to suffer rollback.
   * @returns True if could update the ServiceOrder.
   */
  update: (
    id: number,
    idClient: number,
    idPhone: number,
    beginDate: string,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * Return all ServiceOrders between beginDate and endDate.
   * @param beginDate First Date.
   * @param endDate Last Date.
   * @returns ServiceOrders between beginDate and endDate
   */
  getTotalServiceOrderByPeriod: (
    beginDate: string,
    endDate: string
  ) => Promise<number>;

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

  /**
   * Return the average service duration.
   * @returns Average service duration.
   */
  getAverageServiceDuration: () => Promise<any[]>;
}

export const ServiceOrder = (): ServiceOrder => {
  const crud = Crud();

  const insert = async (
    idClient: number,
    idPhone: number,
    services: Array<Number>,
    beginDate: string,
    forceRollBack: boolean = false
  ): Promise<{ id: number }> => {
    return new Promise(async (resolve, rejects) => {
      let phone = Phone();
      const p = await phone.findOne(idPhone);
      if (p.length <= 0) rejects("phone doesn't exist");
      let client = Client();
      let c = await client.findOne(idClient);
      if (c.length <= 0) rejects("client doesn't exist");
      let s = await Service().find();
      let mustHave = [...services];
      for (let i = 0; i < s.length; i++) {
        if (mustHave.includes(s[i].id)) {
          mustHave.splice(mustHave.indexOf(s[i].id), 1);
        }
      }
      if (mustHave.length !== 0) {
        rejects("could not insert, invalid service");
      }

      let { id } = await crud.insert(
        "ServiceOrder",
        {
          idClient,
          idPhone,
          beginDate,
        },
        forceRollBack
      );

      try {
        for (let i = 0; i < services.length; i++) {
          await crud.insert(
            "serviceOrderHasService",
            {
              idServiceOrder: Number(id),
              idService: services[i],
            },
            forceRollBack
          );
        }
      } catch (error) {
        rejects(error);
      }
      resolve({ id: id });
    });
  };

  const remove = (
    id: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("ServiceOrder", id)
        .then((res) => {
          res[0].canceled = true;
          crud
            .update("ServiceOrder", id, res[0], forceRollBack)
            .then((res) => {
              resolve(res);
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

  const find = (): Promise<any[]> => {
    return new Promise(async (resolve, rejects) => {
      try {
        let serviceOrders = await crud.findServiceOrder();
        let services;
        for (let i = 0; i < serviceOrders.length; i++) {
          services = await crud.findServiceByOrderService(serviceOrders[i].id);
          if (services.length > 0) serviceOrders[i].services = services;
          else serviceOrders[i].services = [];
        }
        resolve(serviceOrders);
      } catch (error) {
        rejects(error);
      }
    });
  };

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

  const update = (
    id: number,
    idClient: number,
    idPhone: number,
    beginDate: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      let new_ServiceOrder: ServiceOrderObject = {
        idClient,
        idPhone,
        beginDate,
      };
      crud
        .update("ServiceOrder", id, new_ServiceOrder, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const fixDate = (date: string): string => {
    let day, month, year;
    year = date.split("-")[0];
    month = date.split("-")[1];
    day = date.split("-")[2];
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  const getTotalServiceOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      beginDate = fixDate(beginDate);
      endDate = fixDate(endDate);
      crud
        .totalServiceOrderByPeriod(beginDate, endDate)
        .then((res) => {
          resolve(res.length);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

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

  const getTotalValueFromServicesByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      beginDate = fixDate(beginDate);
      endDate = fixDate(endDate);
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

  const getAverageValueFromServicesOrderByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      beginDate = fixDate(beginDate);
      endDate = fixDate(endDate);
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

  const getAverageServiceOrderQuantityByPeriod = (
    beginDate: string,
    endDate: string
  ): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      beginDate = fixDate(beginDate);
      endDate = fixDate(endDate);
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

  const getAverageServiceDuration = (): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
      crud
        .averageServiceDuration()
        .then(async (res) => {
          let data: any[] = [];
          for (let i = 0; i < res.length; i++) {
            let service = await crud
              .findOne("Service", res[i].idService)
              .catch((err) => {
                rejects(err);
              });
            data.push({
              media: res[i].media,
              service: service,
            });
          }
          resolve(data);
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
    getAverageServiceDuration,
  };
};
