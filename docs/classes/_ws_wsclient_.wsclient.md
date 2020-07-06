[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["ws/wsClient"](../modules/_ws_wsclient_.md) › [wsClient](_ws_wsclient_.wsclient.md)

# Class: wsClient

## Hierarchy

* **wsClient**

## Index

### Constructors

* [constructor](_ws_wsclient_.wsclient.md#constructor)

### Properties

* [WebSocket](_ws_wsclient_.wsclient.md#websocket)
* [_index](_ws_wsclient_.wsclient.md#_index)
* [client](_ws_wsclient_.wsclient.md#client)
* [events](_ws_wsclient_.wsclient.md#events)
* [request](_ws_wsclient_.wsclient.md#request)

### Methods

* [api](_ws_wsclient_.wsclient.md#api)
* [fetch](_ws_wsclient_.wsclient.md#fetch)
* [newIndex](_ws_wsclient_.wsclient.md#newindex)

## Constructors

###  constructor

\+ **new wsClient**(`ws`: WebSocket, `request`: ExpressRequest, `client?`: any): *[wsClient](_ws_wsclient_.wsclient.md)*

*Defined in [lib/ws/wsClient.ts:25](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`ws` | WebSocket |
`request` | ExpressRequest |
`client?` | any |

**Returns:** *[wsClient](_ws_wsclient_.wsclient.md)*

## Properties

###  WebSocket

• **WebSocket**: *WebSocket*

*Defined in [lib/ws/wsClient.ts:21](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L21)*

___

###  _index

• **_index**: *number*

*Defined in [lib/ws/wsClient.ts:24](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L24)*

___

###  client

• **client**: *any*

*Defined in [lib/ws/wsClient.ts:23](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L23)*

___

###  events

• **events**: *FetchEvent[]*

*Defined in [lib/ws/wsClient.ts:25](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L25)*

___

###  request

• **request**: *ExpressRequest*

*Defined in [lib/ws/wsClient.ts:22](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L22)*

## Methods

###  api

▸ **api**(`api`: string): *object*

*Defined in [lib/ws/wsClient.ts:62](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L62)*

Send a api request to the client

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`api` | string | The event name to send to client  |

**Returns:** *object*

* **delete**(`body`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹unknown›*

* **get**(`body`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹unknown›*

* **post**(`body`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹unknown›*

* **put**(`body`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹unknown›*

___

###  fetch

▸ **fetch**(`api`: string, `body?`: any, `options?`: [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md)): *Promise‹unknown›*

*Defined in [lib/ws/wsClient.ts:102](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L102)*

Send a reverse fetch to the client.

This allows you to make a request to the connected client from the server or send updated data to the client when it comes available

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`api` | string | The api event name to send |
`body?` | any | the payload to send with the request |
`options?` | [requestOptions](../interfaces/_ws_wsclient_.requestoptions.md) | the options for the request  |

**Returns:** *Promise‹unknown›*

___

###  newIndex

▸ **newIndex**(): *number*

*Defined in [lib/ws/wsClient.ts:155](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/ws/wsClient.ts#L155)*

**Returns:** *number*
