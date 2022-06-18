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
  insert: (idClient: number, idPhone: number) => Promise<{ id: number }>;

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
  find: () => Promise<any>;

  /**
   * Return a ServiceOrder from the database.
   * @param id ServiceOrder id.
   * @returns ServiceOrder.
   */
  findOne: (id: number) => Promise<any>;

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
    idPhone: number
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
                    .then((res) => {
                      resolve(res);
                    })
                    .catch((err) => {
                      rejects(err);
                    });
                } else {
                  rejects("could not insert");
                }
              })
              .catch((err) => {
                rejects(err);
              });
          } else {
            rejects("could not insert");
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
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .find("ServiceOrder")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return a ServiceOrder from the database.
   * @param id ServiceOrder id.
   * @returns ServiceOrder.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("ServiceOrder", id)
        .then((res) => {
          resolve(res);
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
