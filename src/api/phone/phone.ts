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
   * @param forceRollBack Force the insert to suffer rollback.
   * @returns The id of the inserted phone.
   */
  insert: (model: string, forceRollBack?: boolean) => Promise<{ id: number }>;

  /**
   * Remove a Phone from the database.
   * @param id Phone id
   * @param forceRollBack Force the remove to suffer rollback.
   * @returns True if were able to remove.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<number>;

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
   * @param forceRollBack Force the update to suffer rollback.
   * @returns True if could update the Phone.
   */
  update: (
    id: number,
    model: string,
    forceRollBack?: boolean
  ) => Promise<number>;

  /**
   * @param file file with all phones to be insert.
   * @returns True if insert all phones.
   */
  insertFile: (file: any) => Promise<boolean>;
}

export const Phone = (): Phone => {
  const crud = Crud();

  const insert = (
    model: string,
    forceRollBack: boolean = false
  ): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      if (model.length <= 0) {
        rejects("could not insert");
      }
      let new_phone: PhoneObject = { model };
      crud
        .insert("Phone", new_phone, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const remove = (
    id: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      crud
        .remove("Phone", id, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

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

  const update = (
    id: number,
    model: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let new_phone: PhoneObject = { model };
      crud
        .update("Phone", id, new_phone, forceRollBack)
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
      console.log(file);
      resolve(true);
    });
  };

  return {
    insertFile,
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
