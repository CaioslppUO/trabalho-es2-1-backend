import { Crud } from "../knex/crud";
import { Service } from "../service/service";
import { ServiceOrder } from "../serviceOrder/serviceOrder";

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
      let new_ServiceOrder: ServiceOrderHasServiceObject = {
        idServiceOrder,
        idService,
      };
      let service = Service();
      service.findOne(idService).then((res) => {
        if (res.length <= 0) {
          rejects("invalid service id");
        }
        let serviceOrder = ServiceOrder();
        serviceOrder.findOne(idServiceOrder).then((res2) => {
          if (res2.length <= 0) {
            rejects("invalid service order id");
          } else {
            crud
              .insert("ServiceOrderHasService", new_ServiceOrder)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                rejects(err);
              });
          }
        });
      });
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
    return new Promise((resolve, rejects) => {
      crud
        .removeNoPrimary(
          "ServiceOrderHasService",
          serviceOrderId,
          serviceId,
          "idServiceOrder",
          "idService"
        )
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return every ServiceOrderHasService in the database.
   * @returns ServiceOrderHasService in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .find("ServiceOrderHasService")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
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
      crud
        .findOneNoPrimary(
          "ServiceOrderHasService",
          serviceOrderId,
          serviceId,
          "idServiceOrder",
          "idService"
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
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
    return new Promise((resolve, rejects) => {
      let new_ServiceOrder: ServiceOrderHasServiceObject = {
        idServiceOrder,
        idService,
      };
      crud
        .updateNoPrimary(
          "ServiceOrderHasService",
          oldIdServiceOrder,
          oldIdService,
          "idServiceOrder",
          "idService",
          new_ServiceOrder
        )
        .then((res) => {
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
