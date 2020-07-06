[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["errors/convertError"](_errors_converterror_.md)

# Module: "errors/convertError"

## Index

### Interfaces

* [RequestError](../interfaces/_errors_converterror_.requesterror.md)

### Functions

* [convertError](_errors_converterror_.md#converterror)

## Functions

###  convertError

▸ **convertError**(`error`: [InvalidRequest](../classes/_errors_invalidrequest_.invalidrequest.md) | [Error](../classes/_errors_invalidrequest_.invalidrequest.md#static-error)): *[RequestError](../interfaces/_errors_converterror_.requesterror.md)*

*Defined in [lib/errors/convertError.ts:20](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/errors/convertError.ts#L20)*

Convert any error to a object to send to client

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | [InvalidRequest](../classes/_errors_invalidrequest_.invalidrequest.md) &#124; [Error](../classes/_errors_invalidrequest_.invalidrequest.md#static-error) | the error to convert to object  |

**Returns:** *[RequestError](../interfaces/_errors_converterror_.requesterror.md)*
