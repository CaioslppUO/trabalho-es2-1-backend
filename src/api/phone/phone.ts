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
  insertPhone: (model: string) => Promise<{ id: number }>;
  /**
   * Remove a Phone from the database.
   * @param id Phone id
   * @returns True if were able to remove.
   */
  removePhone: (id: number) => Promise<boolean>;
}

export const Phone = (): Phone => {
  const crud = Crud();

  /**
   * Insert a new Phone in the database.
   * @param model Model of the phone.
   * @returns The id of the inserted phone.
   */
  const insertPhone = (model: string): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      try {
        let new_phone: PhoneObject = { model };
        console.log(new_phone);
        resolve(crud.insert("Phone", new_phone));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Remove a Phone from the database.
   * @param id Phone id
   * @returns True if were able to remove.
   */
  const removePhone = (id: number): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await crud.remove("Phone", id);
        resolve(true);
      } catch (error) {
        rejects(false);
      }
    });
  };

  return {
    insertPhone,
    removePhone,
  };
};
