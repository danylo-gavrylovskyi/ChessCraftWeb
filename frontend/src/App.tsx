import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import MenuPanel from './components/MenuPanel';
import SettingsPanel from './components/SettingsPanel';
import ExitPanel from './components/ExitPanel';
import GameSetup from './components/GameSetup';
import SVGIcon from './components/SVGIcon';
import './styles/App.css';

const App: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showExit, setShowExit] = useState(false);
    const [boardSize, setBoardSize] = useState<number | null>(null);
    const [closing, setClosing] = useState<string | null>(null);

    const handleBoardSizeSubmit = (size: number) => {
      setBoardSize(size);
    };

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            if (showMenu) setClosing('menu');
            if (showSettings) setClosing('settings');
            if (showExit) setClosing('exit');
        }
    }, [showMenu, showSettings, showExit]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (closing) {
            const timer = setTimeout(() => {
                if (closing === 'menu') setShowMenu(false);
                if (closing === 'settings') setShowSettings(false);
                if (closing === 'exit') setShowExit(false);
                setClosing(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [closing]);

    if (boardSize === null) {
        return <GameSetup onSubmit={handleBoardSizeSubmit} />;
    }

    return (
        <div className="app">
            <div className="main-background">
                <Timer />
                <Board size={boardSize} />
                <SVGIcon name="menu" onClick={() => setShowMenu(true)} className="icon menu-icon" />
                <SVGIcon name="settings" onClick={() => setShowSettings(true)} className="icon settings-icon" />
                <SVGIcon name="exit" onClick={() => setShowExit(true)} className="icon exit-icon" />
                {showMenu && <MenuPanel onClose={() => setClosing('menu')} closing={closing === 'menu'} />}
                {showSettings && <SettingsPanel onClose={() => setClosing('settings')} closing={closing === 'settings'} />}
                {showExit && <ExitPanel onClose={() => setClosing('exit')} closing={closing === 'exit'} />}
            </div>
        </div>
    );
};

export default App;
