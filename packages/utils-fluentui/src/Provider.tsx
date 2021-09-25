import { makeStyles, ThemeProvider } from '@fluentui/react';

import { defaultTheme } from './theme.default';

const useStyles = makeStyles({
    fluentuiThemeProvider: {
        display: 'grid',
        overflow: 'hidden',
        userSelect: 'none',
    },
});

export interface IFluentuiProviderProps extends IChildrenProps {}

export function FluentuiProvider(props: Readonly<IFluentuiProviderProps>) {
    const classes = useStyles();

    return (
        <ThemeProvider id={classes.fluentuiThemeProvider} theme={defaultTheme}>
            {props.children}
        </ThemeProvider>
    );
}
