import { useState } from "react";

const Tooltip = ({ children, text, position = null }) => {
    const [isVisible, setIsVisible] = useState(false);

    let tooltipStyle = {};
    let arrowClass = "";
    if (position === "top") {
        tooltipStyle = { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" };
        arrowClass = "after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-l-4 after:border-r-4 after:border-t-4 after:border-l-transparent after:border-r-transparent after:border-t-[#6A4B85]";
    } else if (position === "right") {
        tooltipStyle = { top: "50%", left: "calc(100% + 12px)", transform: "translateY(-50%)" };
        arrowClass = "before:absolute before:top-1/2 before:-left-1 before:-mt-1 before:border-t-4 before:border-b-4 before:border-r-4 before:border-t-transparent before:border-b-transparent before:border-r-[#6A4B85]";
    }
    
    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`absolute whitespace-nowrap bg-[#6A4B85] text-white text-xs px-2 py-1 rounded-md z-10 ${arrowClass}`}
                    style={tooltipStyle}
                >
                    {text}
                </div>
            )}
        </div>
    );
}

export default Tooltip;