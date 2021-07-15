import { ReactElement } from 'react';
import { IDetailsGroupDividerProps, IDetailsRowProps } from '@fluentui/react';

import { Optional } from '#Common/TypeUtils';

type IRenderFunc<Props> = (
    props?: Props,
    defaultRender?: (props?: Props) => Optional<ReactElement>,
) => Optional<ReactElement>;

export type DetailsGroupDividerRenderFunc = IRenderFunc<IDetailsGroupDividerProps>;

export type DetailsRowRenderFunc = IRenderFunc<IDetailsRowProps>;
