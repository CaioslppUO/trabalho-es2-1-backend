import { Crud } from "../knex/crud";

/**
 * Database Phone interface.
 */
interface PhoneObject {
  model: string;
}

export interface Phone {
  /**
   * Insert a new Phone in the database.
   * @param model Model of the phone.
   * @returns The id of the inserted phone.
   */
  insert: (model: string) => Promise<{ id: number }>;

  /**
   * Remove a Phone from the database.
   * @param id Phone id
   * @returns True if were able to remove.
   */
  remove: (id: number) => Promise<boolean>;

  /**
   * Return every Phone in the database.
   * @returns Phones in the database.
   */
  find: () => Promise<any>;

  /**
   * Return a Phone from the database.
   * @param id Phone id.
   * @returns Phone.
   */
  findOne: (id: number) => Promise<any>;

  /**
   * Update an Phone in the database.
   * @param id Phone id.
   * @param model New Phone content.
   * @returns True if could update the Phone.
   */
  update: (id: number, model: string) => Promise<boolean>;

  findModelsRank: () => Promise<any>;
}

export const Phone = (): Phone => {
  const crud = Crud();

  /**
   * Insert a new Phone in the database.
   * @param model Model of the phone.
   * @returns The id of the inserted phone.
   */
  const insert = (model: string): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      let new_phone: PhoneObject = { model };
      crud
        .insert("Phone", new_phone)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Remove a Phone from the database.
   * @param id Phone id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      crud
        .remove("Phone", id)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return every Phone in the database.
   * @returns Phones in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .find("Phone")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return a Phone from the database.
   * @param id Phone id.
   * @returns Phone.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("Phone", id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Update an Phone in the database.
   * @param id Phone id.
   * @param model New Phone content.
   * @returns True if could update the Phone.
   */
  const update = (id: number, model: string): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      let new_phone: PhoneObject = { model };
      crud
        .update("Phone", id, new_phone)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findModelsRank = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        crud
          .find("Phone")
          .then((res) => {
            crud
              .findServiceOrderCount()
              .then((dt) => {
                console.log(dt);
                resolve(res);
              })
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        rejects(error);
      }
    });
  };

  return {
    findModelsRank,
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
