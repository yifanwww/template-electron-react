import { IStackProps } from '@fluentui/react';

export namespace FluentuiTokens {
    export type Stack = ExcludeFunction<NonNullable<IStackProps['tokens']>>;
}

export namespace FluentuiTokenFunctions {
    export type Stack = ExtractFunction<NonNullable<IStackProps['tokens']>>;
}
