[WebSocketAPI - v1.1.2-3](../README.md) › [Globals](../globals.md) › ["Request"](../modules/_request_.md) › [Request](_request_.request.md)

# Class: Request

A simple api request

## Hierarchy

* **Request**

  ↳ [ServerRequest](_serverrequest_.serverrequest.md)

## Index

### Constructors

* [constructor](_request_.request.md#constructor)

### Properties

* [_send](_request_.request.md#_send)
* [_status](_request_.request.md#_status)
* [body](_request_.request.md#body)
* [id](_request_.request.md#id)
* [method](_request_.request.md#method)
* [name](_request_.request.md#name)

### Methods

* [send](_request_.request.md#send)
* [status](_request_.request.md#status)

## Constructors

###  constructor

\+ **new Request**(`id`: number, `name`: string, `body`: object, `method`: string): *[Request](_request_.request.md)*

*Defined in [lib/Request.ts:11](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`name` | string |
`body` | object |
`method` | string |

**Returns:** *[Request](_request_.request.md)*

## Properties

###  _send

• **_send**: *function*

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

*Defined in [lib/Request.ts:10](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L10)*

___

###  body

• **body**: *object*

*Defined in [lib/Request.ts:8](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L8)*

___

###  id

• **id**: *number*

*Defined in [lib/Request.ts:6](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L6)*

___

###  method

• **method**: *string*

*Defined in [lib/Request.ts:9](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L9)*

___

###  name

• **name**: *string*

*Defined in [lib/Request.ts:7](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L7)*

## Methods

###  send

▸ **send**(`value`: any): *this*

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

*Defined in [lib/Request.ts:49](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/Request.ts#L49)*

Set the request status code

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code` | number | The status code  |

**Returns:** *this*
