import { IStackProps } from '@fluentui/react';
import { ExcludeFunction, ExtractFunction } from '@tecra/utils-type';

export namespace FluentuiTokens {
    export type Stack = ExcludeFunction<PickProp<IStackProps, 'tokens'>>;
}

export namespace FluentuiTokenFunctions {
    export type Stack = ExtractFunction<PickProp<IStackProps, 'tokens'>>;
}
