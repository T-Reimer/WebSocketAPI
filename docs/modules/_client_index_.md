[WebSocketAPI - v1.1.1](../README.md) › [Globals](../globals.md) › ["client/index"](_client_index_.md)

# Module: "client/index"

## Index

### References

* [onSnapshot](_client_index_.md#onsnapshot)

### Interfaces

* [requestOptions](../interfaces/_client_index_.requestoptions.md)

### Functions

* [api](_client_index_.md#api)
* [fetch](_client_index_.md#fetch)
* [getCurrentConnection](_client_index_.md#getcurrentconnection)
* [getCurrentState](_client_index_.md#getcurrentstate)
* [getData](_client_index_.md#getdata)
* [newIndex](_client_index_.md#newindex)
* [on](_client_index_.md#on)
* [sendData](_client_index_.md#senddata)
* [setup](_client_index_.md#setup)

### Object literals

* [setOptions](_client_index_.md#const-setoptions)

## References

###  onSnapshot

• **onSnapshot**:

## Functions

###  api

▸ **api**(`api`: string): *object*

*Defined in [lib/client/index.ts:133](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`api` | string |

**Returns:** *object*

* **delete**(`body`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

* **get**(`body`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

* **post**(`body`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

* **put**(`body`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

* **snapshot**(`body`: any, `callback`: function): *function*

  * (): *void*

___

###  fetch

▸ **fetch**(`api`: string, `body?`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

*Defined in [lib/client/index.ts:267](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L267)*

Make a new api request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`api` | string | the api endpoint to call |
`body?` | any | the data to include in the fetch call |
`options?` | [requestOptions](../interfaces/_client_index_.requestoptions.md) | any options for the request  |

**Returns:** *Promise‹any›*

___

###  getCurrentConnection

▸ **getCurrentConnection**(): *null | WebSocket*

*Defined in [lib/client/index.ts:300](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L300)*

Returns the current web socket connection. This will be null if there isn't a active connection

**Returns:** *null | WebSocket*

___

###  getCurrentState

▸ **getCurrentState**(): *"CONNECTED" | "DISCONNECTED" | "ERROR" | "READY"*

*Defined in [lib/client/index.ts:310](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L310)*

Returns the current state of the web socket

**Returns:** *"CONNECTED" | "DISCONNECTED" | "ERROR" | "READY"*

___

###  getData

▸ **getData**(`id`: number, `api`: string, `body?`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

*Defined in [lib/client/index.ts:170](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L170)*

Request a get or delete

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`api` | string |
`body?` | any |
`options?` | [requestOptions](../interfaces/_client_index_.requestoptions.md) |

**Returns:** *Promise‹any›*

___

###  newIndex

▸ **newIndex**(): *number*

*Defined in [lib/client/index.ts:65](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L65)*

**Returns:** *number*

___

###  on

▸ **on**(`api`: string, `callback`: function): *[eventObject](../interfaces/_client_registerevent_.eventobject.md)*

*Defined in [lib/client/index.ts:293](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L293)*

Register a event listener for events sent from the server

**Parameters:**

▪ **api**: *string*

The api name

▪ **callback**: *function*

the callback function

▸ (`event`: [Request](../classes/_request_.request.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [Request](../classes/_request_.request.md) |

**Returns:** *[eventObject](../interfaces/_client_registerevent_.eventobject.md)*

___

###  sendData

▸ **sendData**(`id`: number, `api`: string, `body?`: any, `options?`: [requestOptions](../interfaces/_client_index_.requestoptions.md)): *Promise‹any›*

*Defined in [lib/client/index.ts:223](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L223)*

Send any post or put data

**`todo`** Add the timeout error

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`api` | string |
`body?` | any |
`options?` | [requestOptions](../interfaces/_client_index_.requestoptions.md) |

**Returns:** *Promise‹any›*

___

###  setup

▸ **setup**(`options`: Options): *void*

*Defined in [lib/client/index.ts:100](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L100)*

Setup the client side api with the correct parameters

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | Options | the options for the client side application  |

**Returns:** *void*

## Object literals

### `Const` setOptions

### ▪ **setOptions**: *object*

*Defined in [lib/client/index.ts:72](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L72)*

The currently using options object

###  fetchUrl

• **fetchUrl**: *string* = "/api"

*Defined in [lib/client/index.ts:73](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L73)*

###  maxSocketLength

• **maxSocketLength**: *number* = 10000

*Defined in [lib/client/index.ts:83](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L83)*

###  reconnect

• **reconnect**: *true* = true

*Defined in [lib/client/index.ts:81](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L81)*

###  reconnectTimeOut

• **reconnectTimeOut**: *number* = 500

*Defined in [lib/client/index.ts:84](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L84)*

###  url

• **url**: *object*

*Defined in [lib/client/index.ts:82](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L82)*

#### Type declaration:

###  websocketUrl

• **websocketUrl**: *string* = "/api"

*Defined in [lib/client/index.ts:74](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L74)*

###  stateChange

▸ **stateChange**(): *void*

*Defined in [lib/client/index.ts:91](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L91)*

**Returns:** *void*

###  unHandledWebSocketMessage

▸ **unHandledWebSocketMessage**(`err`: [Error](../classes/_errors_invalidrequest_.invalidrequest.md#static-error), `message`: string): *void*

*Defined in [lib/client/index.ts:85](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](../classes/_errors_invalidrequest_.invalidrequest.md#static-error) |
`message` | string |

**Returns:** *void*

###  websocketOnMessage

▸ **websocketOnMessage**(`message`: string): *void*

*Defined in [lib/client/index.ts:75](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/client/index.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*
