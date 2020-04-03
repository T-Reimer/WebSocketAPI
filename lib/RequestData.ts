
export default interface RequestData {
    id: number,
    body: any,
    error?: { name: string, message: string },
    method: "GET" | "POST" | "PUT" | "DELETE" | "SNAPSHOT",
    name: string,
    unregister?: boolean, // this unregister event only happens on a snapshot
}


export interface SnapshotResponse {
    last: SnapshotResponse | null;
    data: any;
    timestamp: Date;
    requestHead: any,
}