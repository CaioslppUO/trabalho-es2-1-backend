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
      const re = /\S+@\S+\.\S+/;
      if (cpf.length != 11) {
        rejects("invalid cpf size");
      } else if (!re.test(email)) {
        rejects("invalid email");
      } else if (name.length <= 0) {
        rejects("client name must not be empty");
      }
      let new_Client: ClientObject = { name, email, cpf };
      crud
        .insert("Client", new_Client)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Remove a Client from the database.
   * @param id Client id
   * @returns True if were able to remove.
   */
  const remove = (id: number): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      crud
        .remove("Client", id)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return every Client in the database.
   * @returns Clients in the database.
   */
  const find = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .find("Client")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Return a Client from the database.
   * @param id Client id.
   * @returns Client.
   */
  const findOne = (id: number): Promise<any> => {
    return new Promise((resolve, rejects) => {
      crud
        .findOne("Client", id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  /**
   * Update an Client in the database.
   * @param id Client id.
   * @param name Client name.
   * @param email Client email.
   * @param cpf Client cpf.
   * @returns True if could update the Client.
   */
  const update = (
    id: number,
    name: string,
    email: string,
    cpf: string
  ): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      let new_Client: ClientObject = { name, email, cpf };
      crud
        .update("Client", id, new_Client)
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
