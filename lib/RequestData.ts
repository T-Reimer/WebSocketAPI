
export default interface RequestData {
    id: number | string,
    body: any,
    error?: { name: string, message: string },
    method: "GET" | "POST" | "PUT" | "DELETE",
    name: string
}