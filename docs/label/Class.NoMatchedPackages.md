[@109cafe/label](index.md) / NoMatchedPackages

# Class: NoMatchedPackages

Exception for no matched packages found

## Extends

- `Error`

## Constructors

### new NoMatchedPackages()

> **new NoMatchedPackages**(`label`): [`NoMatchedPackages`](Class.NoMatchedPackages.md)

#### Parameters

• **label**: [`Label`](Interface.Label.md)

#### Returns

[`NoMatchedPackages`](Class.NoMatchedPackages.md)

#### Overrides

`Error.constructor`

#### Defined in

[Developer/label/label/exceptions.ts:32](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/exceptions.ts#L32)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

Library/Caches/pnpm/dlx/7g5m6eybglw7svgzmfaeyzxw3i/19320ca5c83-a67/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### label

> **label**: [`Label`](Interface.Label.md)

#### Defined in

[Developer/label/label/exceptions.ts:32](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/exceptions.ts#L32)

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

Library/Caches/pnpm/dlx/7g5m6eybglw7svgzmfaeyzxw3i/19320ca5c83-a67/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

Library/Caches/pnpm/dlx/7g5m6eybglw7svgzmfaeyzxw3i/19320ca5c83-a67/node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

Library/Caches/pnpm/dlx/7g5m6eybglw7svgzmfaeyzxw3i/19320ca5c83-a67/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

Developer/label/node\_modules/@types/node/globals.d.ts:143

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

Developer/label/node\_modules/@types/node/globals.d.ts:145

## Methods

### captureStackTrace()

#### captureStackTrace(targetObject, constructorOpt)

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

##### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

##### Defined in

Developer/label/node\_modules/@types/node/globals.d.ts:136

#### captureStackTrace(targetObject, constructorOpt)

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

##### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

##### Defined in

Developer/label/node\_modules/bun-types/globals.d.ts:1630
