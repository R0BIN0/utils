import { ErrorLS } from "./ErrorLS";
export type ReturnLS<T = {}> = { state: boolean; error?: ErrorLS; variables?: unknown; result?: T | null };
