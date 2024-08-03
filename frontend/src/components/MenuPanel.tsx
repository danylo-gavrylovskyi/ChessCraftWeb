import React from 'react';
import Button from './Button';
import '../styles/SlidePanel.css';

interface PanelProps {
    onClose: () => void;
    closing: boolean;
}

const MenuPanel: React.FC<PanelProps> = ({ onClose, closing }) => {
    return (
        <div className={`panel menu-panel ${closing ? 'closing' : ''}`}>
            <Button className="close-button" onClick={onClose}>X</Button>
            <div className="button-group">
                <Button onClick={() => console.log('New Game')}>New Game</Button>
                <Button onClick={() => console.log('Bid a draw')}>Bid a draw</Button>
                <Button onClick={() => console.log('Hint')}>Hint</Button>
                <Button onClick={() => console.log('Statistics')}>Statistics</Button>
                <Button onClick={() => console.log('Save')}>Save</Button>
                <Button onClick={() => console.log('Load')}>Load</Button>
            </div>
        </div>
    );
};

export default MenuPanel;
