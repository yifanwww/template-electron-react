import { ThemeProvider } from '@fluentui/react';

import { defaultTheme } from './Theme.Default';

import './Provider.css';

export interface IFluentuiProviderProps extends IReactChildrenProp {}

export const FluentuiProvider = (props: Readonly<IFluentuiProviderProps>) => (
    <ThemeProvider id="FluentuiThemeProvider" theme={defaultTheme}>
        {
            // eslint-disable-next-line react/destructuring-assignment
            props.children
        }
    </ThemeProvider>
);
