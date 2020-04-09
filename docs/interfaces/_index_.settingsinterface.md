[WebSocketAPI - v1.1.2-3](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [SettingsInterface](_index_.settingsinterface.md)

# Interface: SettingsInterface

## Hierarchy

* **SettingsInterface**

## Index

### Properties

* [maxLength](_index_.settingsinterface.md#optional-maxlength)
* [on](_index_.settingsinterface.md#on)
* [onAuthKey](_index_.settingsinterface.md#onauthkey)

## Properties

### `Optional` maxLength

• **maxLength**? : *undefined | number*

*Defined in [lib/index.ts:15](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/index.ts#L15)*

___

###  on

• **on**: *object*

*Defined in [lib/index.ts:23](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/index.ts#L23)*

#### Type declaration:

* **error**: *Function*

___

###  onAuthKey

• **onAuthKey**: *function*

*Defined in [lib/index.ts:22](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/index.ts#L22)*

If the onAuthKey is set as a function then the request must be authenticated before more api calls will be answered

This function can be async and if it throws an error or returns false the client will be disconnected.
A truthy response will register the api.

#### Type declaration:

▸ (`key`: AuthEventMessage["key"], `client`: [wsClient](../classes/_ws_wsclient_.wsclient.md), `ws`: WebSocket, `req`: any): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`key` | AuthEventMessage["key"] |
`client` | [wsClient](../classes/_ws_wsclient_.wsclient.md) |
`ws` | WebSocket |
`req` | any |
