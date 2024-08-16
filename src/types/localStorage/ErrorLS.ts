export enum ErrorLS {
  WINDOW_IS_UNDEFINED = "The window object is not defined",
  NO_KEY = "No key was provided",
  NO_DEFAULT_VALUE = "No default value was provided",
  ALREADY_EXISTS = "An item in local storage is already initialized with this key",
  NOT_ASSOCIATED = "No local storage entry is associated with this key",
  UNABLE_TO_ADD = "Unable to add the item to the array",
  UNABLE_TO_UPDATE = "Unable to update the item in the array",
  UNABLE_TO_FIND = "Unable to find the item in the array",
  NOT_ARRAY_TYPE = "The local storage value is not of array type",
  ARRAY_NULL = "The existing array is null",
}
