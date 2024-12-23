import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

interface TooltipProps extends TippyProps {
    content: string;
    children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(({ content, children, ...props }, ref) => {
    return (
        <Tippy content={content} animation="scale" arrow={true} {...props}>
            <span ref={ref}>{children}</span>
        </Tippy>
    );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
