import { Crud } from "../knex/crud";
import { Phone } from "../phone/phone";
import { Client } from "../client/client";

/**
 * Database ServiceOrder interface.
 */
interface ServiceOrderObject {
  idClient: number;
  idPhone: number;
}

export interface ServiceOrder {
  /**
   * Insert a new ServiceOrder in the database.
   * @param idClient Id of the Client.
   * @param idPhone Id of the Phone.
   * @returns The id of the inserted ServiceOrder.
   */
  insert: (
    idClient: number,
    idPhone: number,
    services: Array<Number>
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
   * @returns True if could update the ServiceOrder.
   */
  update: (id: number, idClient: number, idPhone: number) => Promise<boolean>;
}

export const ServiceOrder = (): ServiceOrder => {
  const crud = Crud();

  /**
   * Insert a new ServiceOrder in the database.
   * @param idClient Id of the Client.
   * @param idPhone Id of the Phone.
   * @returns The id of the inserted ServiceOrder.
   */
  const insert = (
    idClient: number,
    idPhone: number,
    services: Array<Number>
  ): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      let phone = Phone();
      phone
        .findOne(idPhone)
        .then((res) => {
          if (res.length > 0) {
            let client = Client();
            client
              .findOne(idClient)
              .then((res2) => {
                if (res2.length > 0) {
                  let new_ServiceOrder: ServiceOrderObject = {
                    idClient,
                    idPhone,
                  };
                  crud
                    .insert("ServiceOrder", new_ServiceOrder)
                    .then((res3) => {
                      for (let i = 0; i < services.length; i++) {
                        console.log("aaaaaaaaaaaaaaaaaaaa");
                        crud
                          .insert("serviceOrderHasService", {
                            idServiceOrder: Number(res3),
                            idService: services[i],
                          })
                          .catch((err) => {
                            console.log("CU");
                            rejects(err);
                          });
                      }
                      resolve(res3);
                    })
                    .catch((err) => {
                      rejects(err);
                    });
                } else {
                  rejects("client doesn't exist");
                }
              })
              .catch((err) => {
                rejects(err);
              });
          } else {
            rejects("phone doesn't exist");
          }
        })
        .catch((err) => {
          rejects(err);
        });
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
        .remove("ServiceOrder", id)
        .then(() => {
          resolve(true);
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
   * @returns True if could update the ServiceOrder.
   */
  const update = (
    id: number,
    idClient: number,
    idPhone: number
  ): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      let new_ServiceOrder: ServiceOrderObject = { idClient, idPhone };
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

  return {
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
