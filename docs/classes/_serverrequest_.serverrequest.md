[WebSocketAPI - v1.1.2-3](../README.md) › [Globals](../globals.md) › ["ServerRequest"](../modules/_serverrequest_.md) › [ServerRequest](_serverrequest_.serverrequest.md)

# Class: ServerRequest

A simple api request

## Hierarchy

* [Request](_request_.request.md)

  ↳ **ServerRequest**

## Index

### Constructors

* [constructor](_serverrequest_.serverrequest.md#constructor)

### Properties

* [WebSocket](_serverrequest_.serverrequest.md#websocket)
* [_send](_serverrequest_.serverrequest.md#_send)
* [_status](_serverrequest_.serverrequest.md#_status)
* [body](_serverrequest_.serverrequest.md#body)
* [client](_serverrequest_.serverrequest.md#client)
* [id](_serverrequest_.serverrequest.md#id)
* [method](_serverrequest_.serverrequest.md#method)
* [name](_serverrequest_.serverrequest.md#name)
* [request](_serverrequest_.serverrequest.md#request)

### Methods

* [send](_serverrequest_.serverrequest.md#send)
* [status](_serverrequest_.serverrequest.md#status)

## Constructors

###  constructor

\+ **new ServerRequest**(`id`: number, `name`: string, `body`: object, `method`: string, `client`: [wsClient](_ws_wsclient_.wsclient.md) | null): *[ServerRequest](_serverrequest_.serverrequest.md)*

*Overrides [Request](_request_.request.md).[constructor](_request_.request.md#constructor)*

*Defined in [lib/ServerRequest.ts:13](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/ServerRequest.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`name` | string |
`body` | object |
`method` | string |
`client` | [wsClient](_ws_wsclient_.wsclient.md) &#124; null |

**Returns:** *[ServerRequest](_serverrequest_.serverrequest.md)*

## Properties

###  WebSocket

• **WebSocket**: *WebSocket | null*

*Defined in [lib/ServerRequest.ts:12](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/ServerRequest.ts#L12)*

___

###  _send

• **_send**: *function*

*Inherited from [Request](_request_.request.md).[_send](_request_.request.md#_send)*

*Defined in [lib/Request.ts:11](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L11)*

#### Type declaration:

▸ (`value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

___

###  _status

• **_status**: *number*

*Inherited from [Request](_request_.request.md).[_status](_request_.request.md#_status)*

*Defined in [lib/Request.ts:10](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L10)*

___

###  body

• **body**: *object*

*Inherited from [Request](_request_.request.md).[body](_request_.request.md#body)*

*Defined in [lib/Request.ts:8](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L8)*

___

###  client

• **client**: *[wsClient](_ws_wsclient_.wsclient.md) | null*

*Defined in [lib/ServerRequest.ts:13](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/ServerRequest.ts#L13)*

___

###  id

• **id**: *number*

*Inherited from [Request](_request_.request.md).[id](_request_.request.md#id)*

*Defined in [lib/Request.ts:6](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L6)*

___

###  method

• **method**: *string*

*Inherited from [Request](_request_.request.md).[method](_request_.request.md#method)*

*Defined in [lib/Request.ts:9](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L9)*

___

###  name

• **name**: *string*

*Inherited from [Request](_request_.request.md).[name](_request_.request.md#name)*

*Defined in [lib/Request.ts:7](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L7)*

___

###  request

• **request**: *ExpressRequest | null*

*Defined in [lib/ServerRequest.ts:11](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/ServerRequest.ts#L11)*

## Methods

###  send

▸ **send**(`value`: any): *this*

*Inherited from [Request](_request_.request.md).[send](_request_.request.md#send)*

*Defined in [lib/Request.ts:59](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L59)*

Send a response to the client

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | The value to send to client  |

**Returns:** *this*

___

###  status

▸ **status**(`code`: number): *this*

*Inherited from [Request](_request_.request.md).[status](_request_.request.md#status)*

*Defined in [lib/Request.ts:49](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L49)*

Set the request status code

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code` | number | The status code  |

**Returns:** *this*
