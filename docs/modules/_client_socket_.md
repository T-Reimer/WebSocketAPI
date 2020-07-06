[WebSocketAPI - v1.1.2-3](../README.md) › [Globals](../globals.md) › ["client/socket"](_client_socket_.md)

# Module: "client/socket"

## Index

### Type aliases

* [stateChangeEvent](_client_socket_.md#statechangeevent)

### Variables

* [ready](_client_socket_.md#let-ready)
* [socket](_client_socket_.md#let-socket)
* [stateChangeEvents](_client_socket_.md#const-statechangeevents)

### Functions

* [fetch](_client_socket_.md#fetch)
* [registerSnapshot](_client_socket_.md#registersnapshot)
* [send](_client_socket_.md#send)
* [setup](_client_socket_.md#setup)

## Type aliases

###  stateChangeEvent

Ƭ **stateChangeEvent**: *"OPEN" | "CLOSED" | "ERROR" | "READY" | "AUTHFAILED"*

*Defined in [lib/client/socket.ts:18](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L18)*

## Variables

### `Let` ready

• **ready**: *Boolean* = false

*Defined in [lib/client/socket.ts:22](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L22)*

___

### `Let` socket

• **socket**: *WebSocket | null* = null

*Defined in [lib/client/socket.ts:21](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L21)*

___

### `Const` stateChangeEvents

• **stateChangeEvents**: *function[]* = []

*Defined in [lib/client/socket.ts:19](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L19)*

## Functions

###  fetch

▸ **fetch**(`id`: number, `api`: string, `body?`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹[RequestData](../interfaces/_requestdata_.requestdata.md)›*

*Defined in [lib/client/socket.ts:213](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L213)*

Create a fetch request from the server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | The data request id |
`api` | string | the api endpoint |
`body?` | any | the body to send to the server |
`options?` | [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md) | options for the request  |

**Returns:** *Promise‹[RequestData](../interfaces/_requestdata_.requestdata.md)›*

___

###  registerSnapshot

▸ **registerSnapshot**(`id`: number, `api`: string, `body`: any, `callback`: function): *unregister*

*Defined in [lib/client/socket.ts:260](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L260)*

Register a event to fire each time that id gets sent

Returns a function to unregister the event

**Parameters:**

▪ **id**: *number*

the event id to use

▪ **api**: *string*

the api string

▪ **body**: *any*

the request body to send to the server

▪ **callback**: *function*

the callback to run on each message

▸ (`data`: [RequestData](../interfaces/_requestdata_.requestdata.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [RequestData](../interfaces/_requestdata_.requestdata.md) |

**Returns:** *unregister*

___

###  send

▸ **send**(`body`: object): *void*

*Defined in [lib/client/socket.ts:297](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L297)*

Send a payload to the server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | object | The data to send to the server  |

**Returns:** *void*

___

###  setup

▸ **setup**(): *void*

*Defined in [lib/client/socket.ts:24](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/client/socket.ts#L24)*

**Returns:** *void*
