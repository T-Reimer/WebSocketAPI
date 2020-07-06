[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Interfaces

* [SettingsInterface](../interfaces/_index_.settingsinterface.md)

### Functions

* [on](_index_.md#on)
* [register](_index_.md#register)
* [triggerSnapshot](_index_.md#triggersnapshot)

### Object literals

* [Settings](_index_.md#const-settings)

## Functions

###  on

▸ **on**(`name`: string, `callback?`: undefined | function): *eventObject*

*Defined in [lib/index.ts:95](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L95)*

Register a event listener for the name.

Events are called when a event gets dispatched with that same name

**`example`** on("test", () => {\/*Always run *\/}).get(() => {\/** Get request *\/}).post(() => {\/** post request *\/})

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the event name |
`callback?` | undefined &#124; function | the callback to run  |

**Returns:** *eventObject*

___

###  register

▸ **register**(`app`: Application, `wss`: Server, `route`: string, `options`: Partial‹[SettingsInterface](../interfaces/_index_.settingsinterface.md)›): *void*

*Defined in [lib/index.ts:66](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L66)*

Register the default route with express

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`app` | Application | Express app |
`wss` | Server | the web-wss connection |
`route` | string | the default route  |
`options` | Partial‹[SettingsInterface](../interfaces/_index_.settingsinterface.md)› | - |

**Returns:** *void*

___

###  triggerSnapshot

▸ **triggerSnapshot**(`api`: string, `extra`: any): *void*

*Defined in [lib/index.ts:149](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L149)*

Trigger a update event for any registered listeners

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`api` | string | the api name to update for |
`extra` | any | the data to add  |

**Returns:** *void*

## Object literals

### `Const` Settings

### ▪ **Settings**: *object*

*Defined in [lib/index.ts:50](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L50)*

the default settings object

###  maxLength

• **maxLength**: *number* = 100000

*Defined in [lib/index.ts:51](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L51)*

▪ **on**: *object*

*Defined in [lib/index.ts:52](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/index.ts#L52)*

* **eventCompleted**(): *void*

* **eventReceived**(): *void*
