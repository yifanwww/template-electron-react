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
        export type OnAfterMenuDismiss = PickProp<IButtonProps, 'onAfterMenuDismiss'>;
        export type OnMenuClick = PickProp<IButtonProps, 'onMenuClick'>;
        export type OnRenderAriaDescription = PickProp<IButtonProps, 'onRenderAriaDescription'>;
        export type OnRenderChildren = PickProp<IButtonProps, 'onRenderChildren'>;
        export type OnRenderDescription = PickProp<IButtonProps, 'onRenderDescription'>;
        export type OnRenderIcon = PickProp<IButtonProps, 'onRenderIcon'>;
        export type OnRenderMenuIcon = PickProp<IButtonProps, 'onRenderMenuIcon'>;
        export type OnRenderText = PickProp<IButtonProps, 'onRenderText'>;
    }

    export namespace Checkbox {
        export type OnChange = PickProp<ICheckboxProps, 'onChange'>;
        export type OnRenderLabel = PickProp<ICheckboxProps, 'onRenderLabel'>;
    }

    export namespace ChoiceGroup {
        export type OnChange = PickProp<IChoiceGroupProps, 'onChange'>;
    }

    export namespace ChoiceGroupOption {
        export type OnBlur = PickProp<IChoiceGroupOptionProps, 'onBlur'>;
        export type OnChange = PickProp<IChoiceGroupOptionProps, 'onChange'>;
        export type OnFocus = PickProp<IChoiceGroupOptionProps, 'onFocus'>;
        export type OnRenderField = PickProp<IChoiceGroupOptionProps, 'onRenderField'>;
        export type OnRenderLabel = PickProp<IChoiceGroupOptionProps, 'onRenderLabel'>;
    }

    export namespace ComboBox {
        export type OnChange = PickProp<IComboBoxProps, 'onChange'>;
        export type OnItemClick = PickProp<IComboBoxProps, 'onItemClick'>;
        export type OnMenuDismiss = PickProp<IComboBoxProps, 'onMenuDismiss'>;
        export type OnMenuDismissed = PickProp<IComboBoxProps, 'onMenuDismissed'>;
        export type OnMenuOpen = PickProp<IComboBoxProps, 'onMenuOpen'>;
        export type OnPendingValueChanged = PickProp<IComboBoxProps, 'onPendingValueChanged'>;
        export type OnResolveOptions = PickProp<IComboBoxProps, 'onResolveOptions'>;
        export type OnScrollToItem = PickProp<IComboBoxProps, 'onScrollToItem'>;
        export type OnRenderLabel = PickProp<IComboBoxProps, 'onRenderLabel'>;
        export type OnRenderLowerContent = PickProp<IComboBoxProps, 'onRenderLowerContent'>;
        export type OnRenderUpperContent = PickProp<IComboBoxProps, 'onRenderUpperContent'>;
    }

    export namespace ContextualMenu {
        export type OnDismiss = PickProp<IContextualMenuProps, 'onDismiss'>;
        export type OnItemClick = PickProp<IContextualMenuProps, 'onItemClick'>;
        export type OnMenuDismissed = PickProp<IContextualMenuProps, 'onMenuDismissed'>;
        export type OnMenuOpened = PickProp<IContextualMenuProps, 'onMenuOpened'>;
        export type OnRenderMenuList = PickProp<IContextualMenuProps, 'onRenderMenuList'>;
        export type OnRenderSubMenu = PickProp<IContextualMenuProps, 'onRenderSubMenu'>;
        export type OnRestoreFocus = PickProp<IContextualMenuProps, 'onRestoreFocus'>;
    }

    export namespace ContextualMenuItem {
        export type OnClick = PickProp<IContextualMenuItem, 'onClick'>;
        export type OnMouseDown = PickProp<IContextualMenuItem, 'onMouseDown'>;
        export type OnRender = PickProp<IContextualMenuItem, 'onRender'>;
        export type OnRenderContent = PickProp<IContextualMenuItem, 'onRenderContent'>;
        export type OnRenderIcon = PickProp<IContextualMenuItem, 'onRenderIcon'>;

        export type OnCheckmarkClick = PickProp<IContextualMenuItemProps, 'onCheckmarkClick'>;
    }

    export namespace DetailsList {
        export type OnActiveItemChanged = PickProp<IDetailsListProps, 'onActiveItemChanged'>;
        export type OnColumnHeaderClick = PickProp<IDetailsListProps, 'onColumnHeaderClick'>;
        export type OnColumnHeaderContextMenu = PickProp<IDetailsListProps, 'onColumnHeaderContextMenu'>;
        export type OnColumnResize = PickProp<IDetailsListProps, 'onColumnResize'>;
        export type OnDidUpdate = PickProp<IDetailsListProps, 'onDidUpdate'>;
        export type OnItemContextMenu = PickProp<IDetailsListProps, 'onItemContextMenu'>;
        export type OnItemInvoked = PickProp<IDetailsListProps, 'onItemInvoked'>;
        export type OnRenderCheckbox = PickProp<IDetailsListProps, 'onRenderCheckbox'>;
        export type OnRenderDetailsFooter = PickProp<IDetailsListProps, 'onRenderDetailsFooter'>;
        export type OnRenderDetailsHeader = PickProp<IDetailsListProps, 'onRenderDetailsHeader'>;
        export type OnRenderItemColumn = PickProp<IDetailsListProps, 'onRenderItemColumn'>;
        export type OnRenderMissingItem = PickProp<IDetailsListProps, 'onRenderMissingItem'>;
        export type OnRenderRow = PickProp<IDetailsListProps, 'onRenderRow'>;
        export type OnRowDidMount = PickProp<IDetailsListProps, 'onRowDidMount'>;
        export type OnRowWillUnmount = PickProp<IDetailsListProps, 'onRowWillUnmount'>;
        export type OnShouldVirtualize = PickProp<IDetailsListProps, 'onShouldVirtualize'>;
    }

    export namespace DetailsRow {
        export type OnDidMount = PickProp<IDetailsRowProps, 'onDidMount'>;
        export type OnRenderCheck = PickProp<IDetailsRowProps, 'onRenderCheck'>;
        export type OnRenderDetailsCheckbox = PickProp<IDetailsRowProps, 'onRenderDetailsCheckbox'>;
        export type OnWillUnmount = PickProp<IDetailsRowProps, 'onWillUnmount'>;
    }

    export namespace Dropdown {
        export type OnChange = PickProp<IDropdownProps, 'onChange'>;
        export type OnRenderCaretDown = PickProp<IDropdownProps, 'onRenderCaretDown'>;
        export type OnRenderLabel = PickProp<IDropdownProps, 'onRenderLabel'>;
        export type OnRenderPlaceholder = PickProp<IDropdownProps, 'onRenderPlaceholder'>;
        export type OnRenderTitle = PickProp<IDropdownProps, 'onRenderTitle'>;
    }

    export namespace Image {
        export type OnLoadingStateChange = PickProp<IImageProps, 'onLoadingStateChange'>;
    }

    export namespace List {
        export type OnPageAdded = PickProp<IListProps, 'onPageAdded'>;
        export type OnPageRemoved = PickProp<IListProps, 'onPageRemoved'>;
        export type OnPagesUpdated = PickProp<IListProps, 'onPagesUpdated'>;
        export type OnRenderCell = PickProp<IListProps, 'onRenderCell'>;
        export type OnRenderPage = PickProp<IListProps, 'onRenderPage'>;
        export type OnRenderRoot = PickProp<IListProps, 'onRenderRoot'>;
        export type OnRenderSurface = PickProp<IListProps, 'onRenderSurface'>;
        export type OnShouldVirtualize = PickProp<IListProps, 'onShouldVirtualize'>;
    }

    export namespace Persona {
        export type OnPhotoLoadingStateChange = PickProp<IPersonaProps, 'onPhotoLoadingStateChange'>;
        export type OnRenderInitials = PickProp<IPersonaProps, 'onRenderInitials'>;
        export type OnRenderOptionalText = PickProp<IPersonaProps, 'onRenderOptionalText'>;
        export type OnRenderPersonaCoin = PickProp<IPersonaProps, 'onRenderPersonaCoin'>;
        export type OnRenderPrimaryText = PickProp<IPersonaProps, 'onRenderPrimaryText'>;
        export type OnRenderSecondaryText = PickProp<IPersonaProps, 'onRenderSecondaryText'>;
        export type OnRenderTertiaryText = PickProp<IPersonaProps, 'onRenderTertiaryText'>;
    }

    export namespace Pivot {
        export type OnLinkClick = PickProp<IPivotProps, 'onLinkClick'>;
    }

    export namespace PivotItem {
        export type OnRenderLink = PickProp<IPivotItemProps, 'onRenderItemLink'>;
    }

    export namespace SearchBox {
        export type OnChange = PickProp<ISearchBoxProps, 'onChange'>;
        export type OnClear = PickProp<ISearchBoxProps, 'onClear'>;
        export type OnEscape = PickProp<ISearchBoxProps, 'onEscape'>;
        export type OnSearch = PickProp<ISearchBoxProps, 'onSearch'>;
    }

    export namespace TextField {
        export type OnChange = PickProp<ITextFieldProps, 'onChange'>;
        export type OnGetErrorMessage = PickProp<ITextFieldProps, 'onGetErrorMessage'>;
        export type OnNotifyValidationResult = PickProp<ITextFieldProps, 'onNotifyValidationResult'>;
        export type OnRenderDescription = PickProp<ITextFieldProps, 'onRenderDescription'>;
        export type OnRenderLabel = PickProp<ITextFieldProps, 'onRenderLabel'>;
        export type OnRenderPrefix = PickProp<ITextFieldProps, 'onRenderPrefix'>;
        export type OnRenderSuffix = PickProp<ITextFieldProps, 'onRenderSuffix'>;
    }

    export namespace Toggle {
        export type OnChange = PickProp<IToggleProps, 'onChange'>;
    }
}
