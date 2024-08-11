import styles from "./PlayingWindow.module.css";
import { usePanel } from "../../hooks/usePanel";
import Timer from "../Timer/Timer";
import Board from "../Board/Board";
import SVGIcon from "../SVGIcon/SVGIcon";
import MenuPanel from "../MenuPanel/MenuPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import ExitPanel from "../ExitPanel/ExitPanel";

const PlayingWindow: React.FC = () => {
    const { activePanel, closingPanel, togglePanel, closePanel } = usePanel();

    return (
        <div className={styles.app}>
            {" "}
            <div className={styles.mainBackground}>
                {" "}
                <div className={styles.timer}>
                    {" "}
                    <Timer />
                </div>
                <Board />
                <SVGIcon
                    name="menu"
                    onClick={() => togglePanel("menu")}
                    className={`${styles.icon} ${styles.menuIcon}`}
                />
                <SVGIcon
                    name="settings"
                    onClick={() => togglePanel("settings")}
                    className={`${styles.icon} ${styles.settingsIcon}`}
                />
                <SVGIcon
                    name="exit"
                    onClick={() => togglePanel("exit")}
                    className={`${styles.icon} ${styles.exitIcon}`}
                />
                {activePanel === "menu" && (
                    <MenuPanel
                        onClose={closePanel}
                        closing={closingPanel === "menu"}
                    />
                )}
                {activePanel === "settings" && (
                    <SettingsPanel
                        onClose={closePanel}
                        closing={closingPanel === "settings"}
                    />
                )}
                {activePanel === "exit" && (
                    <ExitPanel
                        onClose={closePanel}
                        closing={closingPanel === "exit"}
                    />
                )}
            </div>
        </div>
    );
};

export default PlayingWindow;
