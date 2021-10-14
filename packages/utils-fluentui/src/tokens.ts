import { IStackProps } from '@fluentui/react';

export namespace FluentuiTokens {
    export type Stack = ExcludeFunction<PickProp<IStackProps, 'tokens'>>;
}

export namespace FluentuiTokenFunctions {
    export type Stack = ExtractFunction<PickProp<IStackProps, 'tokens'>>;
}
