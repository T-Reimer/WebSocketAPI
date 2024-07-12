import { RequestError } from "./errors/convertError";
export default interface RequestData extends ResponseData {
    method: "GET" | "POST" | "PUT" | "DELETE" | "SNAPSHOT";
    body: any;
    name: string;
    unregister?: boolean;
}
export interface ResponseData {
    id: number;
    error?: RequestError | false;
    status?: number;
    name: string;
}
export interface SnapshotResponse {
    last: SnapshotResponse | null;
    data: any;
    timestamp: Date;
    requestHead: any;
}
