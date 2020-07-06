[WebSocketAPI - v1.1.2-3](../README.md) › [Globals](../globals.md) › ["snapShots/registerSnapshotRequest"](_snapshots_registersnapshotrequest_.md)

# Module: "snapShots/registerSnapshotRequest"

## Index

### Variables

* [registeredListeners](_snapshots_registersnapshotrequest_.md#const-registeredlisteners)

### Functions

* [registerSnapshotRequest](_snapshots_registersnapshotrequest_.md#registersnapshotrequest)
* [unregisterSnapshotRequest](_snapshots_registersnapshotrequest_.md#unregistersnapshotrequest)

## Variables

### `Const` registeredListeners

• **registeredListeners**: *SnapshotRequest[]* = []

*Defined in [lib/snapShots/registerSnapshotRequest.ts:7](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/snapShots/registerSnapshotRequest.ts#L7)*

## Functions

###  registerSnapshotRequest

▸ **registerSnapshotRequest**(`data`: [RequestData](../interfaces/_requestdata_.requestdata.md), `event`: [ServerRequest](../classes/_serverrequest_.serverrequest.md), `settings`: [SettingsInterface](../interfaces/_index_.settingsinterface.md)): *void*

*Defined in [lib/snapShots/registerSnapshotRequest.ts:9](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/snapShots/registerSnapshotRequest.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [RequestData](../interfaces/_requestdata_.requestdata.md) |
`event` | [ServerRequest](../classes/_serverrequest_.serverrequest.md) |
`settings` | [SettingsInterface](../interfaces/_index_.settingsinterface.md) |

**Returns:** *void*

___

###  unregisterSnapshotRequest

▸ **unregisterSnapshotRequest**(`data`: [RequestData](../interfaces/_requestdata_.requestdata.md)): *void*

*Defined in [lib/snapShots/registerSnapshotRequest.ts:27](https://github.com/wallsmetalroofing/WebSocketAPI/blob/dd2bbc9/lib/snapShots/registerSnapshotRequest.ts#L27)*

Un register the given snapshot listener

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | [RequestData](../interfaces/_requestdata_.requestdata.md) |   |

**Returns:** *void*
