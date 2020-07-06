[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [SettingsInterface](_index_.settingsinterface.md)

# Interface: SettingsInterface

## Hierarchy

* **SettingsInterface**

## Index

### Properties

* [maxLength](_index_.settingsinterface.md#maxlength)
* [on](_index_.settingsinterface.md#on)
* [onAuthKey](_index_.settingsinterface.md#optional-onauthkey)

## Properties

###  maxLength

• **maxLength**: *number*

*Defined in [lib/index.ts:15](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L15)*

___

###  on

• **on**: *object*

*Defined in [lib/index.ts:23](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L23)*

#### Type declaration:

* **error**? : *undefined | function*

* **eventCompleted**(): *function*

  * (`event`: [ServerRequest](../classes/_serverrequest_.serverrequest.md)): *void*

* **eventReceived**(): *function*

  * (`event`: [ServerRequest](../classes/_serverrequest_.serverrequest.md)): *void*

___

### `Optional` onAuthKey

• **onAuthKey**? : *undefined | function*

*Defined in [lib/index.ts:22](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L22)*

If the onAuthKey is set as a function then the request must be authenticated before more api calls will be answered

This function can be async and if it throws an error or returns false the client will be disconnected.
A truthy response will register the api.
