import * as React from "react";

function SvgEllipse(props: React.SVGProps<SVGSVGElement>){
    return(
        <svg width="36" height="33" viewBox="0 0 76 73" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <ellipse cx="38" cy="36.5" rx="38" ry="36.5" fill="currentColor"/>
        </svg>
    );
}
export default SvgEllipse;