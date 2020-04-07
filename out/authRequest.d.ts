export default interface AuthEventMessage {
    event: "auth";
    key: string | object;
}
export interface AuthFailedMessage {
    event: "auth-failed";
}
