export const clns = <T extends (string | false | undefined | null)[]>(...classNames: T) =>
    classNames.filter(Boolean).join(' ');
