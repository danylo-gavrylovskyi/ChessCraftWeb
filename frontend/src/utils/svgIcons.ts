import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

export const icons = {
    menu: MenuIcon,
    settings: SettingsIcon,
    exit: ExitIcon,
};

export type IconName = keyof typeof icons;
