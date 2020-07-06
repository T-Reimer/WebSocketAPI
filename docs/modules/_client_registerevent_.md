[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["client/registerEvent"](_client_registerevent_.md)

# Module: "client/registerEvent"

## Index

### Interfaces

* [eventObject](../interfaces/_client_registerevent_.eventobject.md)

### Functions

* [registerEvent](_client_registerevent_.md#registerevent)

## Functions

###  registerEvent

▸ **registerEvent**(`name`: string, `callback`: function): *[eventObject](../interfaces/_client_registerevent_.eventobject.md)*

*Defined in [lib/client/registerEvent.ts:19](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/client/registerEvent.ts#L19)*

Register a event listener for events sent from the server

**Parameters:**

▪ **name**: *string*

The api name

▪ **callback**: *function*

the callback function

▸ (`event`: [Request](../classes/_request_.request.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [Request](../classes/_request_.request.md) |

**Returns:** *[eventObject](../interfaces/_client_registerevent_.eventobject.md)*
