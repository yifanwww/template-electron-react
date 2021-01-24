import { ReactElement } from 'react';
import { IDetailsGroupDividerProps, IDetailsRowProps } from '@fluentui/react';

type OptionalElement = ReactElement | null;

export type Props2Element<Props> = (
    props?: Props,
    defaultRender?: (props?: Props) => OptionalElement
) => OptionalElement;

export type DetailsGroupDividerPropsFunc = Props2Element<IDetailsGroupDividerProps>;

export type DetailsRowPropsFunc = Props2Element<IDetailsRowProps>;
