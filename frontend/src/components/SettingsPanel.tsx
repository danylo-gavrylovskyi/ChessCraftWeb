import React from 'react';
import Button from './Button';
import '../styles/SlidePanel.css';

interface PanelProps {
    onClose: () => void;
    closing: boolean;
}

const SettingsPanel: React.FC<PanelProps> = ({ onClose, closing }) => {
    return (
        <div className={`panel settings-panel ${closing ? 'closing' : ''}`}>
            <Button className="close-button" onClick={onClose}>X</Button>
            <div className="button-group">
                <Button onClick={() => console.log('Level difficulty')}>Level difficulty</Button>
                <Button onClick={() => console.log('Music toggle')}>Music (on/off)</Button>
                <Button onClick={() => console.log('User Profile')}>User Profile</Button>
            </div>
        </div>
    );
};

export default SettingsPanel;
