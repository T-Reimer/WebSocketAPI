[WebSocketAPI - v1.1.5-1](../README.md) › [Globals](../globals.md) › ["events/event"](../modules/_events_event_.md) › [Events](_events_event_.events.md)

# Class: Events

## Hierarchy

* **Events**

## Index

### Constructors

* [constructor](_events_event_.events.md#constructor)

### Properties

* [events](_events_event_.events.md#events)

### Methods

* [on](_events_event_.events.md#on)
* [remove](_events_event_.events.md#remove)
* [triggerEvent](_events_event_.events.md#triggerevent)

## Constructors

###  constructor

\+ **new Events**(): *[Events](_events_event_.events.md)*

*Defined in [lib/events/event.ts:6](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/events/event.ts#L6)*

**Returns:** *[Events](_events_event_.events.md)*

## Properties

###  events

• **events**: *object*

*Defined in [lib/events/event.ts:6](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/events/event.ts#L6)*

#### Type declaration:

* \[ **key**: *string*\]: Function[]

## Methods

###  on

▸ **on**(`name`: string, `callback`: Function): *void*

*Defined in [lib/events/event.ts:58](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/events/event.ts#L58)*

Add a Event listener to the event name

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The event name |
`callback` | Function | The callback function.  |

**Returns:** *void*

___

###  remove

▸ **remove**(`name`: string, `callback`: Function): *void*

*Defined in [lib/events/event.ts:73](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/events/event.ts#L73)*

Remove the event from the list

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The event name |
`callback` | Function | the callback to remove  |

**Returns:** *void*

___

###  triggerEvent

▸ **triggerEvent**(`event`: [Request](_request_.request.md)): *void*

*Defined in [lib/events/event.ts:21](https://github.com/T-Reimer/WebSocketAPI/blob/230abad/lib/events/event.ts#L21)*

Trigger a event

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [Request](_request_.request.md) |   |

**Returns:** *void*
