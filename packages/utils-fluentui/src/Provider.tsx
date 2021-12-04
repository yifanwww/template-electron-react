import { makeStyles, ThemeProvider } from '@fluentui/react';

import { defaultTheme } from './theme.default';

const useStyles = makeStyles({
    fluentuiThemeProvider: {
        display: 'grid',
        overflow: 'hidden',
    },
});

export const FluentuiProvider: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <ThemeProvider className={classes.fluentuiThemeProvider} theme={defaultTheme}>
            {children}
        </ThemeProvider>
    );
};
