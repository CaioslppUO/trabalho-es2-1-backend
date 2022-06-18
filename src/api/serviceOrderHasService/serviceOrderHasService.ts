import { Crud } from "../knex/crud";

/**
 * Database ServiceOrder interface.
 */
interface ServiceOrderHasServiceObject {
  idServiceOrder: number;
  idService: number;
}

export interface ServiceOrderHasService {
  /**
   * Insert a new ServiceOrderHasService in the database.
   * @param idServiceOrder Id of the ServiceOrder.
   * @param idService Id of the Service.
   * @returns The id of the inserted ServiceOrderHasService.
   */
  insert: (
    idServiceOrder: number,
    idService: number
  ) => Promise<{ id: number }>;

  /**
   * Remove a ServiceOrderHasService from the database.
   * @param serviceOrderId ServiceOrderer id.
   * @param serviceId Service id.
   * @returns True if were able to remove.
   */
  remove: (serviceOrderId: number, serviceId: number) => Promise<boolean>;

  /**
   * Return every ServiceOrderHasService in the database.
   * @returns ServiceOrderHasService in the database.
   */
  find: () => Promise<any>;

  /**
   * Return a ServiceOrderHasService from the database.
   * @param serviceOrderId ServiceOrderer id.
   * @param serviceId Service id.
   * @returns ServiceOrderHasService.
   */
  findOne: (serviceOrderId: number, serviceId: number) => Promise<any>;

  /**
   * Update an ServiceOrderHasService in the database.
   * @param oldIdServiceOrder ServiceOrderHasService id.
   * @param oldIdService ServiceOrderHasService id.
   * @param idServiceOrder New ServiceOrder id.
   * @param idService New Service id.
   * @returns True if could update the ServiceOrderHasService.
   */
  update: (
    oldIdServiceOrder: number,
    oldIdService: number,
    idServiceOrder: number,
    idService: number
  ) => Promise<boolean>;
}

export const ServiceOrderHasService = (): ServiceOrderHasService => {
  const crud = Crud();

  /**
   * Insert a new ServiceOrderHasService in the database.
   * @param idServiceOrder Id of the ServiceOrder.
   * @param idService Id of the Service.
   * @returns The id of the inserted ServiceOrderHasService.
   */
  const insert = (
    idServiceOrder: number,
    idService: number
  ): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      try {
        let new_ServiceOrder: ServiceOrderHasServiceObject = {
          idServiceOrder,
          idService,
        };
        resolve(crud.insert("ServiceOrderHasService", new_ServiceOrder));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Remove a ServiceOrderHasService from the database.
   * @param serviceOrderId ServiceOrderer id.
   * @param serviceId Service id.
   * @returns True if were able to remove.
   */
  const remove = (
    serviceOrderId: number,
    serviceId: number
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await crud.removeNoPrimary(
          "ServiceOrderHasService",
          serviceOrderId,
          serviceId,
          "idServiceOrder",
          "idService"
        );
        resolve(true);
      } catch (error) {
        rejects(false);
      }
    });
  };

  /**
   * Return every ServiceOrderHasService in the database.
   * @returns ServiceOrderHasService in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.find("ServiceOrderHasService"));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Return a ServiceOrderHasService from the database.
   * @param serviceOrderId ServiceOrderer id.
   * @param serviceId Service id.
   * @returns ServiceOrderHasService.
   */
  const findOne = (serviceOrderId: number, serviceId: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(
          crud.findOneNoPrimary(
            "ServiceOrderHasService",
            serviceOrderId,
            serviceId,
            "idServiceOrder",
            "idService"
          )
        );
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Update an ServiceOrderHasService in the database.
   * @param oldIdServiceOrder ServiceOrderHasService id.
   * @param oldIdService ServiceOrderHasService id.
   * @param idServiceOrder New ServiceOrder id.
   * @param idService New Service id.
   * @returns True if could update the ServiceOrderHasService.
   */
  const update = (
    oldIdServiceOrder: number,
    oldIdService: number,
    idServiceOrder: number,
    idService: number
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let new_ServiceOrder: ServiceOrderHasServiceObject = {
          idServiceOrder,
          idService,
        };
        await crud.updateNoPrimary(
          "ServiceOrderHasService",
          oldIdServiceOrder,
          oldIdService,
          "idServiceOrder",
          "idService",
          { idServiceOrder, idService }
        );
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
