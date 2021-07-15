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
    export type Checkbox = NonNullable<ICheckboxProps['styles']>;
    export type ChoiceGroup = NonNullable<IChoiceGroupProps['styles']>;
    export type ChoiceGroupOption = NonNullable<IChoiceGroupOptionProps['styles']>;
    export type ComboBox = NonNullable<IComboBoxProps['styles']>;
    export type ContextualMenu = NonNullable<IContextualMenuProps['styles']>;
    export type ContextualMenuItem = NonNullable<IContextualMenuItemProps['styles']>;
    export type DetailsList = NonNullable<IDetailsListProps['styles']>;
    export type DetailsRow = NonNullable<IDetailsRowProps['styles']>;
    export type Dropdown = NonNullable<IDropdownProps['styles']>;
    export type Icon = NonNullable<IIconProps['styles']>;
    export type Image = NonNullable<IImageProps['styles']>;
    export type Label = NonNullable<ILabelProps['styles']>;
    export type Persona = NonNullable<IPersonaProps['styles']>;
    export type Pivot = NonNullable<IPivotProps['styles']>;
    export type SearchBox = NonNullable<ISearchBoxProps['styles']>;
    export type Stack = NonNullable<IStackProps['styles']>;
    export type Text = NonNullable<ITextProps['styles']>;
    export type TextField = NonNullable<ITextFieldProps['styles']>;
    export type Toggle = NonNullable<IToggleProps['styles']>;
}
