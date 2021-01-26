import { ReactElement } from 'react';
import { IDetailsGroupDividerProps, IDetailsRowProps } from '@fluentui/react';

type IRenderFunc<Props> = (
    props?: Props,
    defaultRender?: (props?: Props) => ReactElement | null,
) => ReactElement | null;

export type DetailsGroupDividerRenderFunc = IRenderFunc<IDetailsGroupDividerProps>;

export type DetailsRowRenderFunc = IRenderFunc<IDetailsRowProps>;
