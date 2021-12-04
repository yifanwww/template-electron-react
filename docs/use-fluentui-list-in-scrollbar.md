# How to Use @fluentui List in Scrollbar

Example:
```typescript
import { List } from '@fluentui/react';
import { useState } from 'react';
import Scrollbar, { ScrollbarProps } from 'react-scrollbars-custom';

interface Item {
    content: string;
}

const items: Item[] = [
    { content: '1' },
    { content: '2' },
    { content: '3' },
    { content: '4' },
    { content: '5' },
    { content: '6' },
    { content: '7' },
    { content: '8' },
];

const scrollerProps: NonNullable<ScrollbarProps['scrollerProps']> = {
    renderer: ({ elementRef, ...rest }) => {
        // Accroding to @fluentui List (https://developer.microsoft.com/en-us/fluentui#/controls/web/list),
        // `data-is-scrollable` attribute should be added to this element,
        // for @fluentui List listening the correct scroll events.

        return <div ref={elementRef} {...rest} data-is-scrollable />;
    },
};

const renderCell = (item?: Item) => <div>{item?.content}</div>;

function ScrollableList() {
    return <List items={items} onRenderCell={renderCell} />;
}

export function ScrollablePane() {
    const [trackYVisible, setTrackYVisible] = useState(false);

    // HACK: bug in `react-scrollbars-custom`, trackYVisible may be undefined
    //       https://github.com/xobotyi/react-scrollbars-custom/pull/167
    const updateScrollbar: NonNullable<ScrollbarProps['onUpdate']> = (scrollValues) =>
        setTrackYVisible(scrollValues.trackYVisible ?? false);

    return (
        <Scrollbar noScrollX scrollerProps={scrollerProps} onUpdate={updateScrollbar}>
            <ScrollableList />
        </Scrollbar>
    );
}
```
