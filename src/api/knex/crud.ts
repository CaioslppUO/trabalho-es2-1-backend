import { database } from "./knex";

export interface Crud {
  /**
   * Insert in table an object.
   * @param table Table to insert.
   * @param content Object to insert.
   * @returns The id of the inserted object.
   */
  insert: <Type>(table: string, content: Type) => Promise<{ id: number }>;

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @returns Query result.
   */
  remove: (table: string, id: number) => Promise<number>;

  /**
   * Remove an object from a table.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Query result.
   */
  removeNoPrimary: (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ) => Promise<number>;

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  find: (table: string) => Promise<any[]>;

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  findOne: (table: string, id: number) => Promise<any[]>;

  /**
   * Return on object from a table that has no primary id.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Object.
   */
  findOneNoPrimary: (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ) => Promise<any[]>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id Id of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  update: <Type>(table: string, id: number, content: Type) => Promise<number>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id_1 First id of the object.
   * @param id_2 Second id of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 First field to compare of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  updateNoPrimary: <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type
  ) => Promise<number>;
}

export const Crud = (): Crud => {
  /**
   * Insert in table an object.
   * @param table Table to insert.
   * @param content Object to insert.
   * @returns The id of the inserted object.
   */
  const insert = <Type>(
    table: string,
    content: Type
  ): Promise<{ id: number }> => {
    return new Promise(async (resolve, rejects) => {
      await database(table)
        .insert(content)
        .then((res) => {
          resolve({ id: res[0] });
        })
        .catch(() => {
          rejects("could not insert");
        });
    });
  };

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @returns Query result.
   */
  const remove = (table: string, id: number): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where("id", Number(id))
        .del()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not remove");
        });
    });
  };

  /**
   * Remove an object from a table.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Query result.
   */
  const removeNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .del()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not remove");
        });
    });
  };

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  const find = (table: string): Promise<any> => {
    return new Promise(async (resolve) => {
      resolve(
        await database(table)
          .then((res) => res)
          .catch((err) => {
            throw new Error("could not find");
          })
      );
    });
  };

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  const findOne = (table: string, id: number): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where({ id: Number(id) })
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not find one");
        });
    });
  };

  /**
   * Return on object from a table that has no primary id.
   * @param table Table to get the object from.
   * @param id_1 Id of the first field of the object.
   * @param id_2 Id of the second field of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 Second field to compare of the object.
   * @returns Object.
   */
  const findOneNoPrimary = (
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string
  ): Promise<any[]> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not find one");
        });
    });
  };

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id Id of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  const update = <Type>(
    table: string,
    id: number,
    content: Type
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where("id", Number(id))
        .update(content)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id_1 First id of the object.
   * @param id_2 Second id of the object.
   * @param field_1 First field to compare of the object.
   * @param field_2 First field to compare of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  const updateNoPrimary = <Type>(
    table: string,
    id_1: number,
    id_2: number,
    field_1: string,
    field_2: string,
    content: Type
  ): Promise<number> => {
    return new Promise(async (resolve) => {
      await database(table)
        .where(`${field_1}`, Number(id_1))
        .andWhere(`${field_2}`, Number(id_2))
        .update(content)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          throw new Error("could not update");
        });
    });
  };

  return {
    insert,
    remove,
    removeNoPrimary,
    find,
    findOne,
    findOneNoPrimary,
    update,
    updateNoPrimary,
  };
};
