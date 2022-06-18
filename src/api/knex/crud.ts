import { database } from "./knex";
import { Knex } from "knex";

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
  remove: (
    table: string,
    id: number
  ) => Promise<Knex.QueryBuilder<any, number>>;

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
  ) => Promise<Knex.QueryBuilder<any, number>>;

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  find: (table: string) => Promise<any>;

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  findOne: (table: string, id: number) => Promise<any>;

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
  ) => Promise<any>;

  /**
   * Update an object in a table.
   * @param table Table to update object.
   * @param id Id of the object.
   * @param content Content to update the object.
   * @returns Query result.
   */
  update: <Type>(
    table: string,
    id: number,
    content: Type
  ) => Promise<Knex.QueryBuilder<any, number>>;

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
  ) => Promise<Knex.QueryBuilder<any, number>>;
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
    return database(table)
      .insert(content)
      .then((res) => ({ id: res[0] }))
      .catch((err) => {
        throw new Error(err);
      });
  };

  /**
   * Remove an object from a table.
   * @param table Table to remove from.
   * @param id Id of the object to remove.
   * @returns Query result.
   */
  const remove = (
    table: string,
    id: number
  ): Promise<Knex.QueryBuilder<any, number>> => {
    return database(table).where("id", Number(id)).del();
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
  ): Promise<Knex.QueryBuilder<any, number>> => {
    return database(table)
      .where(`${field_1}`, Number(id_1))
      .andWhere(`${field_2}`, Number(id_2))
      .del();
  };

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  const find = (table: string): Promise<any> => {
    return database(table).catch((err) => {
      throw new Error(err);
    });
  };

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  const findOne = (table: string, id: number): Promise<any> => {
    return database(table)
      .where({ id: Number(id) })
      .catch((err) => {
        throw new Error(err);
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
  ): Promise<any> => {
    return database(table)
      .where(`${field_1}`, Number(id_1))
      .andWhere(`${field_2}`, Number(id_2));
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
  ): Promise<Knex.QueryBuilder<any, number>> => {
    return database(table).where("id", Number(id)).update(content);
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
  ): Promise<Knex.QueryBuilder<any, number>> => {
    return database(table)
      .where(`${field_1}`, Number(id_1))
      .andWhere(`${field_2}`, Number(id_2))
      .update(content);
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
