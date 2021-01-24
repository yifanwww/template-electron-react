import {
    IStyleSet,
    ITheme,
    IButtonStyles,
    ICheckboxStyleProps,
    ICheckboxStyles,
    IChoiceGroupOptionStyleProps,
    IChoiceGroupOptionStyles,
    IChoiceGroupStyleProps,
    IChoiceGroupStyles,
    IContextualMenuItemStyleProps,
    IContextualMenuItemStyles,
    IContextualMenuStyleProps,
    IContextualMenuStyles,
    IDetailsListStyleProps,
    IDetailsListStyles,
    IDetailsRowStyleProps,
    IDetailsRowStyles,
    IIconStyleProps,
    IIconStyles,
    IImageStyleProps,
    IImageStyles,
    ILabelStyleProps,
    ILabelStyles,
    IPersonaStyleProps,
    IPersonaStyles,
    ISearchBoxProps,
    ISearchBoxStyles,
    IStackProps,
    IStackTokens,
    IStackStyles,
    ITextProps,
    ITextTokens,
    ITextStyles,
    ITextFieldStyleProps,
    ITextFieldStyles,
    IToggleStyleProps,
    IToggleStyles,
} from '@fluentui/react';

import { DeepPartial } from '#shared/TypeUtils';

export type Props2Styles<StyleProps, Styles extends IStyleSet<Styles>> = (
    props: StyleProps,
) => DeepPartial<Styles>;
export type PropsTokens2Styles<StyleProps, Tokens, Styles extends IStyleSet<Styles>> = (
    props: StyleProps,
    theme: ITheme,
    tokens: Tokens,
) => DeepPartial<Styles>;

export type ButtonStyleFunc<Option extends {} | undefined = undefined> = Option extends undefined
    ? () => IButtonStyles
    : (option: Option) => IButtonStyles;

export type CheckboxStyleFunc = Props2Styles<ICheckboxStyleProps, ICheckboxStyles>;

export type ChoiceGroupStyleFunc = Props2Styles<IChoiceGroupStyleProps, IChoiceGroupStyles>;
// prettier-ignore
export type ChoiceGroupOptionStyleFunc =
    Props2Styles<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;

// prettier-ignore
export type ContextualMenuStyleFunc =
    Props2Styles<IContextualMenuStyleProps, IContextualMenuStyles>;
// prettier-ignore
export type ContextualMenuItemStyleFunc =
    Props2Styles<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;

export type DetailsListStyleFunc = Props2Styles<IDetailsListStyleProps, IDetailsListStyles>;
export type DetailsListRowStyleFunc = Props2Styles<IDetailsRowStyleProps, IDetailsRowStyles>;

export type IconStyleFunc = Props2Styles<IIconStyleProps, IIconStyles>;

export type ImageStyleFunc = Props2Styles<IImageStyleProps, IImageStyles>;

export type LabelStyleFunc = Props2Styles<ILabelStyleProps, ILabelStyles>;

export type PersonaStyleFunc = Props2Styles<IPersonaStyleProps, IPersonaStyles>;

export type SearchBoxStyleFunc = Props2Styles<ISearchBoxProps, ISearchBoxStyles>;

export type StackStyleFunc = PropsTokens2Styles<IStackProps, IStackTokens, IStackStyles>;

export type TextStyleFunc = PropsTokens2Styles<ITextProps, ITextTokens, ITextStyles>;

export type TextFieldStyleFunc = Props2Styles<ITextFieldStyleProps, ITextFieldStyles>;

export type ToggleStyleFunc = Props2Styles<IToggleStyleProps, IToggleStyles>;
