/**
 * Checks if the item passed as a parameter is an array.
 * @param {any} arr - Item expected to be an array.
 * @returns {boolean}
 */
export const _isArray = (arr: any): boolean => Array.prototype.isPrototypeOf(arr);

/**
 * Adds an item to an existing array.
 * @param {T[]} arr - Array to which the item will be added.
 * @param {T} item - New item to add.
 * @returns {T[] | null}
 */
export const _addArray = <T extends { id: string }>(arr: T[], item: T): T[] | null => {
  if (!arr || !_isArray(arr) || !item) return null;
  return [...arr, item];
};

/**
 * Removes an item from an existing array.
 * @param {T[]} arr - Array from which the item will be removed.
 * @param {string} id - ID of the item to remove.
 * @returns {T[] | null}
 */
export const _removeArray = <T extends { id: string }>(arr: T[], id: string): T[] | null => {
  if (!arr || !_isArray(arr) || !id) return null;
  return arr.filter((a) => a.id !== id);
};

/**
 * Updates an item in an existing array.
 * @param {T[]} arr - Array containing the item to update.
 * @param {T} item - Updated item that will replace the old item.
 * @returns {T[] | null}
 */
export const _updateArray = <T extends { id: string }>(arr: T[], item: T): T[] | null => {
  if (!arr || !_isArray(arr) || !item) return null;
  return arr.map((a) => (a.id === item.id ? { ...a, ...item } : a));
};

/**
 * Finds an item in an existing array by its ID.
 * @param {T[]} arr - Array to search for the item.
 * @param {string} id - ID of the item to find.
 * @returns {T | null}
 */
export const _findById = <T extends { id: string }>(arr: T[], id: string): T | null => {
  if (!_isArray(arr) || !arr || !id) return null;
  const item = arr.find((a) => a.id === id);
  if (!item) return null;
  return item;
};

/**
 * Finds the last item in an existing array.
 * @param {T[]} arr - Array to search for the last item.
 * @returns {T | null}
 */
export const _findLast = <T>(arr: T[]): T | null => {
  if (!arr || !_isArray(arr)) return null;
  return arr[arr.length - 1];
};

/**
 * Removes all duplicate items from an existing array.
 * @param {T[]} arr - Array from which duplicates will be removed.
 * @returns {T[] | null}
 */
export const _removeDuplicates = <T>(arr: T[]): T[] | null => {
  if (!arr || !Array.isArray(arr)) return null;
  return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item) as T);
};

/**
 * Sorts an array in ascending order.
 * @param {T[]} arr - Array to sort.
 * @param {keyof T} key - Key used to sort the array.
 * @returns {T[] | null}
 */
export const _ascendingOrder = <T>(arr: T[], key: keyof T): T[] | null => {
  return arr.sort((a, b) => {
    if (a[key] == null && b[key] == null) return 0;
    if (a[key] == null) return 1;
    if (b[key] == null) return -1;
    if (typeof a[key] === "number" && typeof b[key] === "number") {
      return a[key] - b[key];
    }
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return a[key].toLocaleLowerCase().localeCompare(b[key].toLocaleLowerCase());
    }
    // The values compared are neither numbers nor strings
    return 0;
  });
};

/**
 * Sorts an array in descending order.
 * @param {T[]} arr - Array to sort.
 * @param {keyof T} key - Key used to sort the array.
 * @returns {T[] | null}
 */
export const _descendingOrder = <T>(arr: T[], key: keyof T): T[] | null => {
  if (!arr || !Array.isArray(arr)) return null;
  return arr.sort((a, b) => {
    if (a[key] == null && b[key] == null) return 0;
    if (a[key] == null) return 1;
    if (b[key] == null) return -1;

    if (typeof a[key] === "number" && typeof b[key] === "number") {
      return b[key] - a[key];
    }

    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return b[key].toLocaleLowerCase().localeCompare(a[key].toLocaleLowerCase());
    }

    // The values compared are neither numbers nor strings
    return 0;
  });
};

/**
 * Merges multiple arrays into one.
 * @param {T[][]} arrs - Arrays to merge.
 * @returns {T[] | null}
 */
export const _merge = <T>(...arrs: T[][]): T[] | null => {
  if (!arrs || !Array.isArray(arrs)) return null;
  return arrs.flat() as T[];
};

/**
 * Removes items from an existing array that satisfy a specific condition.
 * @param {T[]} arr - Array from which specific items will be removed.
 * @param {(item: T) => boolean} callback - Callback defining the condition for removing specific items.
 * @returns {T[] | null}
 */
export const _removeIf = <T>(arr: T[], callback: (item: T) => boolean): T[] | null => {
  return arr.filter((i) => !callback(i));
};

/**
 * Checks if an existing array is empty.
 * @param {T[]} arr - Array to check.
 * @returns {boolean | null}
 */
export const _isEmpty = <T>(arr: T[]): boolean | null => {
  if (!arr || !Array.isArray(arr)) return null;
  return !arr.length;
};
