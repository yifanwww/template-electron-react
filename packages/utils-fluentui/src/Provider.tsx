import { makeStyles, ThemeProvider } from '@fluentui/react';

import { defaultTheme } from './theme.default';

const useStyles = makeStyles({
    fluentuiThemeProvider: {
        display: 'grid',
        overflow: 'hidden',
    },
});

export interface FluentuiProviderProps extends ReactChildrenProps {}

export function FluentuiProvider(props: FluentuiProviderProps): React.ReactElement {
    const classes = useStyles();

    return (
        <ThemeProvider className={classes.fluentuiThemeProvider} theme={defaultTheme}>
            {props.children}
        </ThemeProvider>
    );
}
