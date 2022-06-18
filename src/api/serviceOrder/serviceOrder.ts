import { Crud } from "../knex/crud";

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
      try {
        let new_ServiceOrder: ServiceOrderObject = { idClient, idPhone };
        resolve(crud.insert("ServiceOrder", new_ServiceOrder));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Remove a ServiceOrder from the database.
   * @param id ServiceOrder id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await crud.remove("ServiceOrder", id);
        resolve(true);
      } catch (error) {
        rejects(false);
      }
    });
  };

  /**
   * Return every ServiceOrder in the database.
   * @returns ServiceOrders in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.find("ServiceOrder"));
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
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.findOne("ServiceOrder", id));
      } catch (error) {
        rejects(error);
      }
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
    return new Promise(async (resolve, reject) => {
      try {
        let new_ServiceOrder: ServiceOrderObject = { idClient, idPhone };
        await crud.update("ServiceOrder", id, new_ServiceOrder);
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
