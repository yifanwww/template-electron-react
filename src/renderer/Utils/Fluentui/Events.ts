import {
    IButtonProps,
    ICheckboxProps,
    IChoiceGroupOptionProps,
    IChoiceGroupProps,
    IComboBoxProps,
    IContextualMenuItem,
    IContextualMenuItemProps,
    IContextualMenuProps,
    IDetailsListProps,
    IDetailsRowProps,
    IDropdownProps,
    IImageProps,
    IListProps,
    IPersonaProps,
    IPivotItemProps,
    IPivotProps,
    ISearchBoxProps,
    ITextFieldProps,
    IToggleProps,
} from '@fluentui/react';

export namespace FluentuiEvents {
    export namespace Button {
        export type OnAfterMenuDismiss = NonNullable<IButtonProps['onAfterMenuDismiss']>;
        export type OnMenuClick = NonNullable<IButtonProps['onMenuClick']>;
        export type OnRenderAriaDescription = NonNullable<IButtonProps['onRenderAriaDescription']>;
        export type OnRenderChildren = NonNullable<IButtonProps['onRenderChildren']>;
        export type OnRenderDescription = NonNullable<IButtonProps['onRenderDescription']>;
        export type OnRenderIcon = NonNullable<IButtonProps['onRenderIcon']>;
        export type OnRenderMenuIcon = NonNullable<IButtonProps['onRenderMenuIcon']>;
        export type OnRenderText = NonNullable<IButtonProps['onRenderText']>;
    }

    export namespace Checkbox {
        export type OnChange = NonNullable<ICheckboxProps['onChange']>;
        export type OnRenderLabel = NonNullable<ICheckboxProps['onRenderLabel']>;
    }

    export namespace ChoiceGroup {
        export type OnChange = NonNullable<IChoiceGroupProps['onChange']>;
    }

    export namespace ChoiceGroupOption {
        export type OnBlur = NonNullable<IChoiceGroupOptionProps['onBlur']>;
        export type OnChange = NonNullable<IChoiceGroupOptionProps['onChange']>;
        export type OnFocus = NonNullable<IChoiceGroupOptionProps['onFocus']>;
        export type OnRenderField = NonNullable<IChoiceGroupOptionProps['onRenderField']>;
        export type OnRenderLabel = NonNullable<IChoiceGroupOptionProps['onRenderLabel']>;
    }

    export namespace ComboBox {
        export type OnChange = NonNullable<IComboBoxProps['onChange']>;
        export type OnItemClick = NonNullable<IComboBoxProps['onItemClick']>;
        export type OnMenuDismiss = NonNullable<IComboBoxProps['onMenuDismiss']>;
        export type OnMenuDismissed = NonNullable<IComboBoxProps['onMenuDismissed']>;
        export type OnMenuOpen = NonNullable<IComboBoxProps['onMenuOpen']>;
        export type OnPendingValueChanged = NonNullable<IComboBoxProps['onPendingValueChanged']>;
        export type OnResolveOptions = NonNullable<IComboBoxProps['onResolveOptions']>;
        export type OnScrollToItem = NonNullable<IComboBoxProps['onScrollToItem']>;
        export type OnRenderLabel = NonNullable<IComboBoxProps['onRenderLabel']>;
        export type OnRenderLowerContent = NonNullable<IComboBoxProps['onRenderLowerContent']>;
        export type OnRenderUpperContent = NonNullable<IComboBoxProps['onRenderUpperContent']>;
    }

    export namespace ContextualMenu {
        export type OnDismiss = NonNullable<IContextualMenuProps['onDismiss']>;
        export type OnItemClick = NonNullable<IContextualMenuProps['onItemClick']>;
        export type OnMenuDismissed = NonNullable<IContextualMenuProps['onMenuDismissed']>;
        export type OnMenuOpened = NonNullable<IContextualMenuProps['onMenuOpened']>;
        export type OnRenderMenuList = NonNullable<IContextualMenuProps['onRenderMenuList']>;
        export type OnRenderSubMenu = NonNullable<IContextualMenuProps['onRenderSubMenu']>;
        export type OnRestoreFocus = NonNullable<IContextualMenuProps['onRestoreFocus']>;
    }

    export namespace ContextualMenuItem {
        export type OnClick = NonNullable<IContextualMenuItem['onClick']>;
        export type OnMouseDown = NonNullable<IContextualMenuItem['onMouseDown']>;
        export type OnRender = NonNullable<IContextualMenuItem['onRender']>;
        export type OnRenderContent = NonNullable<IContextualMenuItem['onRenderContent']>;
        export type OnRenderIcon = NonNullable<IContextualMenuItem['onRenderIcon']>;

        export type OnCheckmarkClick = NonNullable<IContextualMenuItemProps['onCheckmarkClick']>;
    }

    export namespace DetailsList {
        export type OnActiveItemChanged = NonNullable<IDetailsListProps['onActiveItemChanged']>;
        export type OnColumnHeaderClick = NonNullable<IDetailsListProps['onColumnHeaderClick']>;
        export type OnColumnHeaderContextMenu = NonNullable<IDetailsListProps['onColumnHeaderContextMenu']>;
        export type OnColumnResize = NonNullable<IDetailsListProps['onColumnResize']>;
        export type OnDidUpdate = NonNullable<IDetailsListProps['onDidUpdate']>;
        export type OnItemContextMenu = NonNullable<IDetailsListProps['onItemContextMenu']>;
        export type OnItemInvoked = NonNullable<IDetailsListProps['onItemInvoked']>;
        export type OnRenderCheckbox = NonNullable<IDetailsListProps['onRenderCheckbox']>;
        export type OnRenderDetailsFooter = NonNullable<IDetailsListProps['onRenderDetailsFooter']>;
        export type OnRenderDetailsHeader = NonNullable<IDetailsListProps['onRenderDetailsHeader']>;
        export type OnRenderItemColumn = NonNullable<IDetailsListProps['onRenderItemColumn']>;
        export type OnRenderMissingItem = NonNullable<IDetailsListProps['onRenderMissingItem']>;
        export type OnRenderRow = NonNullable<IDetailsListProps['onRenderRow']>;
        export type OnRowDidMount = NonNullable<IDetailsListProps['onRowDidMount']>;
        export type OnRowWillUnmount = NonNullable<IDetailsListProps['onRowWillUnmount']>;
        export type OnShouldVirtualize = NonNullable<IDetailsListProps['onShouldVirtualize']>;
    }

    export namespace DetailsRow {
        export type OnDidMount = NonNullable<IDetailsRowProps['onDidMount']>;
        export type OnRenderCheck = NonNullable<IDetailsRowProps['onRenderCheck']>;
        export type OnRenderDetailsCheckbox = NonNullable<IDetailsRowProps['onRenderDetailsCheckbox']>;
        export type OnWillUnmount = NonNullable<IDetailsRowProps['onWillUnmount']>;
    }

    export namespace Dropdown {
        export type OnChange = NonNullable<IDropdownProps['onChange']>;
        export type OnRenderCaretDown = NonNullable<IDropdownProps['onRenderCaretDown']>;
        export type OnRenderLabel = NonNullable<IDropdownProps['onRenderLabel']>;
        export type OnRenderPlaceholder = NonNullable<IDropdownProps['onRenderPlaceholder']>;
        export type OnRenderTitle = NonNullable<IDropdownProps['onRenderTitle']>;
    }

    export namespace Image {
        export type OnLoadingStateChange = NonNullable<IImageProps['onLoadingStateChange']>;
    }

    export namespace List {
        export type OnPageAdded = NonNullable<IListProps['onPageAdded']>;
        export type OnPageRemoved = NonNullable<IListProps['onPageRemoved']>;
        export type OnPagesUpdated = NonNullable<IListProps['onPagesUpdated']>;
        export type OnRenderCell = NonNullable<IListProps['onRenderCell']>;
        export type OnRenderPage = NonNullable<IListProps['onRenderPage']>;
        export type OnRenderRoot = NonNullable<IListProps['onRenderRoot']>;
        export type OnRenderSurface = NonNullable<IListProps['onRenderSurface']>;
        export type OnShouldVirtualize = NonNullable<IListProps['onShouldVirtualize']>;
    }

    export namespace Persona {
        export type OnPhotoLoadingStateChange = NonNullable<IPersonaProps['onPhotoLoadingStateChange']>;
        export type OnRenderInitials = NonNullable<IPersonaProps['onRenderInitials']>;
        export type OnRenderOptionalText = NonNullable<IPersonaProps['onRenderOptionalText']>;
        export type OnRenderPersonaCoin = NonNullable<IPersonaProps['onRenderPersonaCoin']>;
        export type OnRenderPrimaryText = NonNullable<IPersonaProps['onRenderPrimaryText']>;
        export type OnRenderSecondaryText = NonNullable<IPersonaProps['onRenderSecondaryText']>;
        export type OnRenderTertiaryText = NonNullable<IPersonaProps['onRenderTertiaryText']>;
    }

    export namespace Pivot {
        export type OnLinkClick = NonNullable<IPivotProps['onLinkClick']>;
    }

    export namespace PivotItem {
        export type OnRenderLink = NonNullable<IPivotItemProps['onRenderItemLink']>;
    }

    export namespace SearchBox {
        export type OnChange = NonNullable<ISearchBoxProps['onChange']>;
        export type OnClear = NonNullable<ISearchBoxProps['onClear']>;
        export type OnEscape = NonNullable<ISearchBoxProps['onEscape']>;
        export type OnSearch = NonNullable<ISearchBoxProps['onSearch']>;
    }

    export namespace TextField {
        export type OnChange = NonNullable<ITextFieldProps['onChange']>;
        export type OnGetErrorMessage = NonNullable<ITextFieldProps['onGetErrorMessage']>;
        export type OnNotifyValidationResult = NonNullable<ITextFieldProps['onNotifyValidationResult']>;
        export type OnRenderDescription = NonNullable<ITextFieldProps['onRenderDescription']>;
        export type OnRenderLabel = NonNullable<ITextFieldProps['onRenderLabel']>;
        export type OnRenderPrefix = NonNullable<ITextFieldProps['onRenderPrefix']>;
        export type OnRenderSuffix = NonNullable<ITextFieldProps['onRenderSuffix']>;
    }

    export namespace Toggle {
        export type OnChange = NonNullable<IToggleProps['onChange']>;
    }
}
