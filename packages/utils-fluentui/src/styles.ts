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
    export type Button = PickProp<IButtonProps, 'styles'>;
    export type Checkbox = ExcludeFunction<PickProp<ICheckboxProps, 'styles'>>;
    export type ChoiceGroup = ExcludeFunction<PickProp<IChoiceGroupProps, 'styles'>>;
    export type ChoiceGroupOption = ExcludeFunction<PickProp<IChoiceGroupOptionProps, 'styles'>>;
    export type ComboBox = PickProp<IComboBoxProps, 'styles'>;
    export type ContextualMenu = ExcludeFunction<PickProp<IContextualMenuProps, 'styles'>>;
    export type ContextualMenuItem = ExcludeFunction<PickProp<IContextualMenuItemProps, 'styles'>>;
    export type DetailsList = ExcludeFunction<PickProp<IDetailsListProps, 'styles'>>;
    export type DetailsRow = ExcludeFunction<PickProp<IDetailsRowProps, 'styles'>>;
    export type Dropdown = ExcludeFunction<PickProp<IDropdownProps, 'styles'>>;
    export type Icon = ExcludeFunction<PickProp<IIconProps, 'styles'>>;
    export type Image = ExcludeFunction<PickProp<IImageProps, 'styles'>>;
    export type Label = ExcludeFunction<PickProp<ILabelProps, 'styles'>>;
    export type Persona = ExcludeFunction<PickProp<IPersonaProps, 'styles'>>;
    export type Pivot = ExcludeFunction<PickProp<IPivotProps, 'styles'>>;
    export type SearchBox = ExcludeFunction<PickProp<ISearchBoxProps, 'styles'>>;
    export type Stack = ExcludeFunction<PickProp<IStackProps, 'styles'>>;
    export type Text = ExcludeFunction<PickProp<ITextProps, 'styles'>>;
    export type TextField = ExcludeFunction<PickProp<ITextFieldProps, 'styles'>>;
    export type Toggle = ExcludeFunction<PickProp<IToggleProps, 'styles'>>;
}

export namespace FluentuiStyleFunctions {
    export type Button = () => FluentuiStyles.Button;
    export type Checkbox = ExtractFunction<PickProp<ICheckboxProps, 'styles'>>;
    export type ChoiceGroup = ExtractFunction<PickProp<IChoiceGroupProps, 'styles'>>;
    export type ChoiceGroupOption = ExtractFunction<PickProp<IChoiceGroupOptionProps, 'styles'>>;
    export type ComboBox = () => FluentuiStyles.Checkbox;
    export type ContextualMenu = ExtractFunction<PickProp<IContextualMenuProps, 'styles'>>;
    export type ContextualMenuItem = ExtractFunction<PickProp<IContextualMenuItemProps, 'styles'>>;
    export type DetailsList = ExtractFunction<PickProp<IDetailsListProps, 'styles'>>;
    export type DetailsRow = ExtractFunction<PickProp<IDetailsRowProps, 'styles'>>;
    export type Dropdown = ExtractFunction<PickProp<IDropdownProps, 'styles'>>;
    export type Icon = ExtractFunction<PickProp<IIconProps, 'styles'>>;
    export type Image = ExtractFunction<PickProp<IImageProps, 'styles'>>;
    export type Label = ExtractFunction<PickProp<ILabelProps, 'styles'>>;
    export type Persona = ExtractFunction<PickProp<IPersonaProps, 'styles'>>;
    export type Pivot = ExtractFunction<PickProp<IPivotProps, 'styles'>>;
    export type SearchBox = ExtractFunction<PickProp<ISearchBoxProps, 'styles'>>;
    export type Stack = ExtractFunction<PickProp<IStackProps, 'styles'>>;
    export type Text = ExtractFunction<PickProp<ITextProps, 'styles'>>;
    export type TextField = ExtractFunction<PickProp<ITextFieldProps, 'styles'>>;
    export type Toggle = ExtractFunction<PickProp<IToggleProps, 'styles'>>;
}
