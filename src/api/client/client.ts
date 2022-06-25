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
   * @param forceRollBack Force the insert to suffer rollback.
   * @returns The id of the inserted Client.
   */
  insert: (
    name: string,
    email: string,
    cpf: string,
    forceRollBack?: boolean
  ) => Promise<{ id: number }>;

  /**
   * Remove a Client from the database.
   * @param id Client id
   * @param forceRollBack Force the remove to suffer rollback.
   * @returns True if were able to remove.
   */
  remove: (id: number, forceRollBack?: boolean) => Promise<boolean>;

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
   * @param forceRollBack Force the update to suffer rollback.
   * @returns True if could update the Client.
   */
  update: (
    id: number,
    name: string,
    email: string,
    cpf: string,
    forceRollBack?: boolean
  ) => Promise<number>;
}

export const Client = (): Client => {
  const crud = Crud();

  const insert = (
    name: string,
    email: string,
    cpf: string,
    forceRollBack: boolean = false
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
        .insert("Client", new_Client, forceRollBack)
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
  ): Promise<boolean> => {
    return new Promise((resolve, rejects) => {
      crud
        .remove("Client", id, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

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

  const update = (
    id: number,
    name: string,
    email: string,
    cpf: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise((resolve, rejects) => {
      let new_Client: ClientObject = { name, email, cpf };
      crud
        .update("Client", id, new_Client, forceRollBack)
        .then((res) => {
          resolve(res);
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
