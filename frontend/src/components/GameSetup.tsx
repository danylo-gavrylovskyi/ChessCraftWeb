import React, { useState } from 'react';
import Button from './Button';
import '../styles/GameSetup.css';

interface GameSetupProps {
    onSubmit: (size: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onSubmit }) => {
    const [size, setSize] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedSize = parseInt(size);
        if ([4, 8, 9, 15].includes(parsedSize)) {
            onSubmit(parsedSize);
        } else {
            alert('Please select a valid board size');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="game-setup">
            <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Select board size</option>
                <option value="4">4x4</option>
                <option value="8">8x8</option>
                <option value="9">9x9</option>
                <option value="15">15x15</option>
            </select>
            <Button onClick={handleSubmit}>
                Start game
            </Button>
        </form>
    );
};

export default GameSetup;
