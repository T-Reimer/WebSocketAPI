[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["client/onSnapshot"](_client_onsnapshot_.md)

# Module: "client/onSnapshot"

## Index

### Functions

* [onSnapshot](_client_onsnapshot_.md#onsnapshot)

## Functions

###  onSnapshot

▸ **onSnapshot**(`api`: string, `requestHead`: any, `callback`: function): *function*

*Defined in [lib/client/onSnapshot.ts:14](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/client/onSnapshot.ts#L14)*

Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.

**Parameters:**

▪ **api**: *string*

the api end point to call

▪ **requestHead**: *any*

any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here

▪ **callback**: *function*

the callback to run the the snapshot data

▸ (`snapshot`: [SnapshotResponse](../interfaces/_requestdata_.snapshotresponse.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | [SnapshotResponse](../interfaces/_requestdata_.snapshotresponse.md) |

**Returns:** *function*

▸ (): *void*
