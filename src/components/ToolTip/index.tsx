"use client";
import React, { useId, useRef } from "react";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

interface ToolTipProps {
    tooltip: React.ReactNode,
    children: React.ReactNode,
    backgroundColor?: string
}
export default function ToolTip(props: ToolTipProps) {
    const { tooltip, backgroundColor } = props;
    const id = useId();
    return (<>
        <div className="cursor-help" data-tooltip-id={id}>
            {props.children}
        </div>
        <Tooltip id={id} style={{ backgroundColor: backgroundColor }}>
            {tooltip}
        </Tooltip>
    </>)
}

// interface ToolTipProps {
//     tooltip: string,
//     children: React.ReactNode
// }
// export default function ToolTip(props: ToolTipProps) {
//     const toolTipRef = useRef<HTMLSpanElement>(null)
//     const containerRef = useRef<HTMLDivElement>(null)

//     return (<>
//         <div
//             ref={containerRef}
//             onMouseEnter={(event) => {
//                 if (!toolTipRef.current || !containerRef.current) return;
//                 const { left } = containerRef.current.getBoundingClientRect()
//                 toolTipRef.current.style.left = event.clientX - left + "px"

//             }}
//             className="group relative inline-block">
//             {props.children}
//             <span ref={toolTipRef} className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-danger text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap">{props.tooltip}</span>
//         </div>
//     </>)
// }