import { Crud } from "../knex/crud";

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
   * @returns The id of the inserted Service.
   */
  insert: (type: string, price: number) => Promise<{ id: number }>;

  /**
   * Remove a Service from the database.
   * @param id Service id
   * @returns True if were able to remove.
   */
  remove: (id: number) => Promise<boolean>;

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
   * @returns True if could update the Service.
   */
  update: (id: number, type: string, price: number) => Promise<boolean>;
}

export const Service = (): Service => {
  const crud = Crud();

  /**
   * Insert a new Service in the database.
   * @param type Type of the Service.
   * @param price Price of the service.
   * @returns The id of the inserted Service.
   */
  const insert = (type: string, price: number): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      try {
        let new_service: ServiceObject = { type, price };
        resolve(crud.insert("Service", new_service));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Remove a Service from the database.
   * @param id Service id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await crud.remove("Service", id);
        resolve(true);
      } catch (error) {
        rejects(false);
      }
    });
  };

  /**
   * Return every Service in the database.
   * @returns Services in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.find("Service"));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Return a Service from the database.
   * @param id Service id.
   * @returns Service.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.findOne("Service", id));
      } catch (error) {
        rejects(error);
      }
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
    price: number
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let new_service: ServiceObject = { type, price };
        await crud.update("Service", id, new_service);
        resolve(true);
      } catch (error) {
        reject(false);
      }
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
