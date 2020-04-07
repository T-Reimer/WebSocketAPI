[WebSocketAPI - v1.1.1](../README.md) › [Globals](../globals.md) › ["RequestData"](../modules/_requestdata_.md) › [RequestData](_requestdata_.requestdata.md)

# Interface: RequestData

## Hierarchy

* [ResponseData](_requestdata_.responsedata.md)

  ↳ **RequestData**

## Index

### Properties

* [body](_requestdata_.requestdata.md#body)
* [error](_requestdata_.requestdata.md#optional-error)
* [id](_requestdata_.requestdata.md#id)
* [method](_requestdata_.requestdata.md#method)
* [name](_requestdata_.requestdata.md#name)
* [status](_requestdata_.requestdata.md#optional-status)
* [unregister](_requestdata_.requestdata.md#optional-unregister)

## Properties

###  body

• **body**: *any*

*Defined in [lib/RequestData.ts:5](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L5)*

___

### `Optional` error

• **error**? : *[RequestError](_errors_converterror_.requesterror.md) | false*

*Inherited from [RequestData](_requestdata_.requestdata.md).[error](_requestdata_.requestdata.md#optional-error)*

*Defined in [lib/RequestData.ts:12](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L12)*

___

###  id

• **id**: *number*

*Inherited from [RequestData](_requestdata_.requestdata.md).[id](_requestdata_.requestdata.md#id)*

*Defined in [lib/RequestData.ts:11](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L11)*

___

###  method

• **method**: *"GET" | "POST" | "PUT" | "DELETE" | "SNAPSHOT"*

*Defined in [lib/RequestData.ts:4](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L4)*

___

###  name

• **name**: *string*

*Overrides [ResponseData](_requestdata_.responsedata.md).[name](_requestdata_.responsedata.md#name)*

*Defined in [lib/RequestData.ts:6](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L6)*

___

### `Optional` status

• **status**? : *undefined | number*

*Inherited from [RequestData](_requestdata_.requestdata.md).[status](_requestdata_.requestdata.md#optional-status)*

*Defined in [lib/RequestData.ts:13](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L13)*

___

### `Optional` unregister

• **unregister**? : *undefined | false | true*

*Defined in [lib/RequestData.ts:7](https://github.com/T-Reimer/WebSocketAPI/blob/7bc0908/lib/RequestData.ts#L7)*
