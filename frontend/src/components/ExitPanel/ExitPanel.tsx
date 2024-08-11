import React from "react";
import Button from "../Button/Button";
import styles from "./FadePanel.module.css";

interface PanelProps {
    onClose: () => void;
    closing: boolean;
}

const ExitPanel: React.FC<PanelProps> = ({ onClose, closing }) => {
    return (
        <div
            className={`${styles.panel} ${styles.exitPanel} ${
                closing ? styles.closing : ""
            }`}
        >
            <Button className={styles.button} onClick={onClose}>
                X
            </Button>
            <p>Progress will be lost, are you sure you want to exit?</p>
            <div className={`${styles.buttonGroup} ${styles.horizontal}`}>
                <Button onClick={() => console.log("Exit game")}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </div>
        </div>
    );
};

export default ExitPanel;
