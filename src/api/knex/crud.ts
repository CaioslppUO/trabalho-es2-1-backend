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
  remove: (table: string, id: number) => Knex.QueryBuilder<any, number>;

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  find: (table: string) => any;

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  findOne: (table: string, id: number) => any;

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
  ) => Knex.QueryBuilder<any, number>;
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
      .then((res) => ({ id: res[0] }));
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
  ): Knex.QueryBuilder<any, number> => {
    return database(table).where("id", Number(id)).del();
  };

  /**
   * Select and return all objects from a table.
   * @param table Table to select objects.
   * @returns All objects from a table.
   */
  const find = (table: string): any => {
    return database(table);
  };

  /**
   * Return on object from a table.
   * @param table Table to get the object from.
   * @param id Id of the object.
   * @returns Object.
   */
  const findOne = (table: string, id: number): any => {
    return database(table).where({ id: Number(id) });
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
  ): Knex.QueryBuilder<any, number> => {
    return database(table).where("id", Number(id)).update(content);
  };

  return {
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
