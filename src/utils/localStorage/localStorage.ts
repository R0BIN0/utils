import { ErrorLS } from "../../types/localStorage/ErrorLS";
import { ReturnLS } from "../../types/localStorage/ReturnLS";
import * as array from "../array/array";

/**
 * Initializes the local storage with a default value for a given key.
 * @param {string} key - The key for the item in local storage.
 * @param {unknown} defaultValue - The default value to set.
 * @returns {ReturnLS} - The result of the initialization, including success state and potential errors.
 */
export const _initializeStorage = (key: string, defaultValue: unknown): ReturnLS => {
  if (typeof window === "undefined")
    return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, defaultValue } };
  if (defaultValue === undefined) return { state: false, error: ErrorLS.NO_DEFAULT_VALUE, variables: { key, defaultValue } };
  const { result, error } = _getItem(key);
  if (error && error !== ErrorLS.NOT_ASSOCIATED) return { state: false, error: error, variables: { key, defaultValue } };
  if (result || result === null || result === false)
    return { state: false, error: ErrorLS.ALREADY_EXISTS, variables: { key, defaultValue } };
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return { state: true, variables: { key, defaultValue } };
};

/**
 * Retrieves an item from local storage.
 * @template T
 * @param {string} key - The key of the item in local storage.
 * @returns {ReturnLS<T> | ReturnLS<T[]>} - The retrieved item or an error state.
 */
export function _getItem<T>(key: string): ReturnLS<T>;
export function _getItem<T>(key: string): ReturnLS<T[]>;
export function _getItem<T>(key: string): ReturnLS<T> | ReturnLS<T[]> {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key } };
  if (!key) return { state: false, error: ErrorLS.NO_KEY, variables: { key } };
  const item = localStorage.getItem(key);
  if (!item) return { state: false, error: ErrorLS.NOT_ASSOCIATED, variables: { key } };
  const res = JSON.parse(item);
  if (Array.isArray(res)) {
    return { state: true, variables: { key }, result: res as T[] };
  } else {
    return { state: true, variables: { key }, result: res as T };
  }
}

/**
 * Sets an item in local storage.
 * @template T
 * @param {string} key - The key of the item in local storage.
 * @param {T} item - The item to store.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _setItem = <T>(key: string, item: T): ReturnLS => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, item } };
  if (!key) return { state: false, error: ErrorLS.NO_KEY, variables: { key, item } };
  localStorage.setItem(key, JSON.stringify(item));
  return { state: true, variables: { key, item } };
};

/**
 * Pushes an item into an array stored in local storage.
 * @template T
 * @param {string} key - The key of the array in local storage.
 * @param {T} item - The item to push into the array.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _pushItem = <T>(key: string, item: T): ReturnLS => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, item } };
  const oldArray = _getArray<T>(key);
  if (oldArray.error || oldArray.result === null) return { state: false, error: oldArray.error, variables: { key, item } };
  const newArray = array._addArray(oldArray.result!, item);
  if (newArray === null) return { state: false, error: ErrorLS.UNABLE_TO_ADD, variables: { key, item } };
  localStorage.setItem(key, JSON.stringify(newArray));
  return { state: true, variables: { key, item } };
};

/**
 * Removes an item from an array stored in local storage by its ID.
 * @template T extends { id: string | number }
 * @param {string} key - The key of the array in local storage.
 * @param {string | number} id - The ID of the item to remove.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _removeItem = <T extends { id: string | number }>(key: string, id: string | number): ReturnLS => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, id } };
  const oldArray = _getArray<T>(key);
  if (oldArray.error || oldArray.result === null) return { state: false, error: oldArray.error, variables: { key, id } };
  const newArray = array._removeArray(oldArray.result!, id);
  localStorage.setItem(key, JSON.stringify(newArray));
  return { state: true, variables: { key, id } };
};

/**
 * Updates an item in an array stored in local storage by its ID.
 * @template T extends { id: string | number }
 * @param {string} key - The key of the array in local storage.
 * @param {Partial<T>} updatedItem - The updated item to replace the old one.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _updateItem = <T extends { id: string | number }>(key: string, updatedItem: Partial<T>): ReturnLS => {
  if (typeof window === "undefined")
    return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, updatedItem } };
  const oldArray = _getArray<T>(key);
  if (oldArray.error || oldArray.result! === null)
    return { state: false, error: oldArray.error, variables: { key, updatedItem } };
  const newArray = array._updateArray(oldArray.result!, updatedItem);
  if (newArray === null) return { state: false, error: ErrorLS.UNABLE_TO_UPDATE, variables: { key, updatedItem } };
  localStorage.setItem(key, JSON.stringify(newArray));
  return { state: true, variables: { key, updatedItem } };
};

/**
 * Finds an item by its ID in an array stored in local storage.
 * @template T extends { id: string | number }
 * @param {string} key - The key of the array in local storage.
 * @param {string | number} id - The ID of the item to find.
 * @returns {ReturnLS<T>} - The result of the search, including success state and the found item, or an error.
 */
export const _findItemById = <T extends { id: string | number }>(key: string, id: string | number): ReturnLS<T> => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key, id } };
  const oldArray = _getArray<T>(key);
  if (oldArray.error || oldArray.result === null) return { state: false, error: oldArray.error, variables: { key, id } };
  const res = array._findById(oldArray.result!, id);
  if (!res) return { state: false, error: ErrorLS.UNABLE_TO_FIND, variables: { key, id } };
  return { state: true, variables: { key, id }, result: res };
};

/**
 * Clears the item associated with a key in local storage.
 * @param {string} key - The key of the item in local storage.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _clear = (key: string): ReturnLS => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED, variables: { key } };
  const oldItems = _getItem(key);
  if (oldItems.error) return { state: false, error: oldItems.error, variables: { key } };
  localStorage.setItem(key, JSON.stringify(null));
  return { state: true, variables: { key } };
};

/**
 * Clears all items in local storage.
 * @returns {ReturnLS} - The result of the operation, including success state and potential errors.
 */
export const _clearAll = (): ReturnLS => {
  if (typeof window === "undefined") return { state: false, error: ErrorLS.WINDOW_IS_UNDEFINED };
  localStorage.clear();
  return { state: true };
};

const _getArray = <T>(key: string): Pick<ReturnLS<T[]>, "error" | "result"> => {
  const oldArray = _getItem<T[]>(key);
  if (oldArray.error) return { error: oldArray.error, result: null };
  if (!array._isArray(oldArray.result)) return { error: ErrorLS.NOT_ARRAY_TYPE, result: null };
  if (!oldArray.result) return { error: ErrorLS.ARRAY_NULL, result: null };
  return { result: oldArray.result };
};
