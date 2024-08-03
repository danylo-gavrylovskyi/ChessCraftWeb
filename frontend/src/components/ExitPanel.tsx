import React from 'react';
import Button from './Button';
import '../styles/FadePanel.css';

interface PanelProps {
    onClose: () => void;
    closing: boolean;
}

const ExitPanel: React.FC<PanelProps> = ({ onClose, closing }) => {
    return (
        <div className={`panel exit-panel ${closing ? 'closing' : ''}`}>
            <Button className="close-button" onClick={onClose}>X</Button>
            <p>Progress will be lost, are you sure you want to exit?</p>
            <div className="button-group horizontal">
                <Button onClick={() => console.log('Exit game')}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </div>
        </div>
    );
};

export default ExitPanel;
