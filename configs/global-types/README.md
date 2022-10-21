# @tecra-config/global-types

Global type declarations for tecra.

This package contains the following type declarations:
- types which help to import assets
- types which help to test code
- types which help to handle complex types
- types which help to use modules easier

## Usage

Add reference to this package in your global type declaration file.

For example:

```ts
// global.d.ts

/// <reference types="@tecra-config/global-types" />
```

```ts
// global.d.ts

/// <reference types="@tecra-config/global-types/lib/env" />
/// <reference types="@tecra-config/global-types/lib/test" />
/// <reference types="@tecra-config/global-types/lib/utils.type" />
```
