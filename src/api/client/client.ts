import { Crud } from "../knex/crud";

/**
 * Database Client interface.
 */
interface ClientObject {
  name: string;
  email: string;
  cpf: string;
}

export interface Client {
  /**
   * Insert a new Client in the database.
   * @param name Client name.
   * @param email Client email.
   * @param cpf Client cpf.
   * @returns The id of the inserted Client.
   */
  insert: (name: string, email: string, cpf: string) => Promise<{ id: number }>;

  /**
   * Remove a Client from the database.
   * @param id Client id
   * @returns True if were able to remove.
   */
  remove: (id: number) => Promise<boolean>;

  /**
   * Return every Client in the database.
   * @returns Clients in the database.
   */
  find: () => Promise<any>;

  /**
   * Return a Client from the database.
   * @param id Client id.
   * @returns Client.
   */
  findOne: (id: number) => Promise<any>;

  /**
   * Update an Client in the database.
   * @param id Client id.
   * @param name Client name.
   * @param email Client email.
   * @param cpf Client cpf.
   * @param model New Client content.
   * @returns True if could update the Client.
   */
  update: (
    id: number,
    name: string,
    email: string,
    cpf: string
  ) => Promise<boolean>;
}

export const Client = (): Client => {
  const crud = Crud();

  /**
   * Insert a new Client in the database.
   * @param name Client name.
   * @param email Client email.
   * @param cpf Client cpf.
   * @returns The id of the inserted Client.
   */
  const insert = (
    name: string,
    email: string,
    cpf: string
  ): Promise<{ id: number }> => {
    return new Promise((resolve, rejects) => {
      try {
        let new_Client: ClientObject = { name, email, cpf };
        console.log(new_Client);
        resolve(crud.insert("Client", new_Client));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Remove a Client from the database.
   * @param id Client id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await crud.remove("Client", id);
        resolve(true);
      } catch (error) {
        rejects(false);
      }
    });
  };

  /**
   * Return every Client in the database.
   * @returns Clients in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.find("Client"));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Return a Client from the database.
   * @param id Client id.
   * @returns Client.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        resolve(crud.findOne("Client", id));
      } catch (error) {
        rejects(error);
      }
    });
  };

  /**
   * Update an Client in the database.
   * @param id Client id.
   * @param name Client name.
   * @param email Client email.
   * @param cpf Client cpf.
   * @param model New Client content.
   * @returns True if could update the Client.
   */
  const update = (
    id: number,
    name: string,
    email: string,
    cpf: string
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        let new_Client: ClientObject = { name, email, cpf };
        await crud.update("Client", id, new_Client);
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