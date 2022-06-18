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

  return {
    insert,
    remove,
  };
};
