import React from "react";
import { icons, IconName } from "../../utils/svgIcons";

interface SVGIconProps {
    name: IconName;
    onClick: () => void;
    className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ name, onClick, className }) => {
    const IconComponent = icons[name];
    return <IconComponent onClick={onClick} className={className} />;
};

export default SVGIcon;
