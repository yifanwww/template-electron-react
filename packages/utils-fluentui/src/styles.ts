import {
    IButtonProps,
    ICheckboxProps,
    IChoiceGroupOptionProps,
    IChoiceGroupProps,
    IComboBoxProps,
    IContextualMenuItemProps,
    IContextualMenuProps,
    IDetailsListProps,
    IDetailsRowProps,
    IDropdownProps,
    IIconProps,
    IImageProps,
    ILabelProps,
    IPersonaProps,
    IPivotProps,
    ISearchBoxProps,
    IStackProps,
    ITextFieldProps,
    ITextProps,
    IToggleProps,
} from '@fluentui/react';

export namespace FluentuiStyles {
    export type Button = NonNullable<IButtonProps['styles']>;
    export type Checkbox = ExcludeFunction<NonNullable<ICheckboxProps['styles']>>;
    export type ChoiceGroup = ExcludeFunction<NonNullable<IChoiceGroupProps['styles']>>;
    export type ChoiceGroupOption = ExcludeFunction<NonNullable<IChoiceGroupOptionProps['styles']>>;
    export type ComboBox = NonNullable<IComboBoxProps['styles']>;
    export type ContextualMenu = ExcludeFunction<NonNullable<IContextualMenuProps['styles']>>;
    export type ContextualMenuItem = ExcludeFunction<NonNullable<IContextualMenuItemProps['styles']>>;
    export type DetailsList = ExcludeFunction<NonNullable<IDetailsListProps['styles']>>;
    export type DetailsRow = ExcludeFunction<NonNullable<IDetailsRowProps['styles']>>;
    export type Dropdown = ExcludeFunction<NonNullable<IDropdownProps['styles']>>;
    export type Icon = ExcludeFunction<NonNullable<IIconProps['styles']>>;
    export type Image = ExcludeFunction<NonNullable<IImageProps['styles']>>;
    export type Label = ExcludeFunction<NonNullable<ILabelProps['styles']>>;
    export type Persona = ExcludeFunction<NonNullable<IPersonaProps['styles']>>;
    export type Pivot = ExcludeFunction<NonNullable<IPivotProps['styles']>>;
    export type SearchBox = ExcludeFunction<NonNullable<ISearchBoxProps['styles']>>;
    export type Stack = ExcludeFunction<NonNullable<IStackProps['styles']>>;
    export type Text = ExcludeFunction<NonNullable<ITextProps['styles']>>;
    export type TextField = ExcludeFunction<NonNullable<ITextFieldProps['styles']>>;
    export type Toggle = ExcludeFunction<NonNullable<IToggleProps['styles']>>;
}

export namespace FluentuiStyleFunctions {
    export type Button = () => FluentuiStyles.Button;
    export type Checkbox = ExtractFunction<NonNullable<ICheckboxProps['styles']>>;
    export type ChoiceGroup = ExtractFunction<NonNullable<IChoiceGroupProps['styles']>>;
    export type ChoiceGroupOption = ExtractFunction<NonNullable<IChoiceGroupOptionProps['styles']>>;
    export type ComboBox = () => FluentuiStyles.Checkbox;
    export type ContextualMenu = ExtractFunction<NonNullable<IContextualMenuProps['styles']>>;
    export type ContextualMenuItem = ExtractFunction<NonNullable<IContextualMenuItemProps['styles']>>;
    export type DetailsList = ExtractFunction<NonNullable<IDetailsListProps['styles']>>;
    export type DetailsRow = ExtractFunction<NonNullable<IDetailsRowProps['styles']>>;
    export type Dropdown = ExtractFunction<NonNullable<IDropdownProps['styles']>>;
    export type Icon = ExtractFunction<NonNullable<IIconProps['styles']>>;
    export type Image = ExtractFunction<NonNullable<IImageProps['styles']>>;
    export type Label = ExtractFunction<NonNullable<ILabelProps['styles']>>;
    export type Persona = ExtractFunction<NonNullable<IPersonaProps['styles']>>;
    export type Pivot = ExtractFunction<NonNullable<IPivotProps['styles']>>;
    export type SearchBox = ExtractFunction<NonNullable<ISearchBoxProps['styles']>>;
    export type Stack = ExtractFunction<NonNullable<IStackProps['styles']>>;
    export type Text = ExtractFunction<NonNullable<ITextProps['styles']>>;
    export type TextField = ExtractFunction<NonNullable<ITextFieldProps['styles']>>;
    export type Toggle = ExtractFunction<NonNullable<IToggleProps['styles']>>;
}
