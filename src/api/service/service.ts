import { Crud } from "../knex/crud";
import database from "../knex/knex";
const fetch = require("node-fetch");

/**
 * Database Service interface.
 */
interface ServiceObject {
  type: string;
  price: number;
}

export interface Service {
  /**
   * Insert a new Service in the database.
   * @param type Type of the Service.
   * @param price Price of the service.
   * @param forceRollBack Force the insert to suffer rollback.
   * @returns The id of the inserted Service.
   */
  insert: (
    type: string,
    price: number,
    forceRollBack?: boolean
  ) => Promise<{ id: number }>;

  /**
   * Remove a Service from the database.
   * @param id Service id
   * @param forceRollBack Force the remove to suffer rollback.
   * @returns True if were able to remove.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

  /**
   * Return every Service in the database.
   * @returns Services in the database.
   */
  find: () => Promise<any>;

  /**
   * Return a Service from the database.
   * @param id Service id.
   * @returns Service.
   */
  findOne: (id: number) => Promise<any>;

  /**
   * Update an Service in the database.
   * @param id Service id.
   * @param type New Service content.
   * @param price New Service price.
   * @param forceRollBack Force the update to suffer rollback.
   * @returns True if could update the Service.
   */
  update: (
    id: number,
    type: string,
    price: number,
    forceRollBack?: boolean
  ) => Promise<number>;

  findRankServiceByModel: () => Promise<any>;

  /**
   * @param file file with all services to be insert.
   * @returns True if insert all services.
   */
  insertFile: (file: any) => Promise<boolean>;
}

export const Service = (): Service => {
  const crud = Crud();

  const insert = (
    type: string,
    price: number,
    forceRollBack: boolean = false
  ): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      if (type.length <= 0) {
        rejects("service type must not be empty");
      }
      let new_service: ServiceObject = { type, price };
      crud
        .insert("Service", new_service, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Remove a Service from the database.
   * @param id Service id
   * @returns True if were able to remove.
   */
  const remove = (
    id: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("Service", id)
        .then((res) => {
          res[0].deleted = true;
          crud
            .update("Service", id, res[0], forceRollBack)
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

  /**
   * Return every Service in the database.
   * @returns Services in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .find("Service")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return a Service from the database.
   * @param id Service id.
   * @returns Service.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("Service", id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Update an Service in the database.
   * @param id Service id.
   * @param type New Service content.
   * @param price New Service price.
   * @returns True if could update the Service.
   */
  const update = (
    id: number,
    type: string,
    price: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let new_service: ServiceObject = { type, price };
      crud
        .update("Service", id, new_service, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return a Service from the database.
   * @returns Services order by model phone.
   */
  const findRankServiceByModel = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .findRankServiceByModel()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const insertFile = (file: any): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const fileContent = require(file.path);
        for (let i = 0; i < fileContent.length; i++) {
          crud
            .insert(
              "Service",
              { price: fileContent[i].valor, type: fileContent[i].serviço },
              false
            )
            .catch((err) => {
              rejects(err);
            });
        }
        resolve(true);
      } catch (err) {
        rejects(err);
      }
    });
  };

  return {
    insertFile,
    findRankServiceByModel,
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
