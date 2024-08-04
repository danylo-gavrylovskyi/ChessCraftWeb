import React, { useState } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import MenuPanel from './components/MenuPanel';
import SettingsPanel from './components/SettingsPanel';
import ExitPanel from './components/ExitPanel';
import GameSetup from './components/GameSetup';
import SVGIcon from './components/SVGIcon';
import { usePanel } from './hooks/usePanel';
import './styles/App.css';

const App: React.FC = () => {
    const [boardSize, setBoardSize] = useState<number | null>(null);
    const { activePanel, closingPanel, togglePanel, closePanel } = usePanel();

    const handleBoardSizeSubmit = (size: number) => {
      setBoardSize(size);
    };

    if (boardSize === null) {
        return <GameSetup onSubmit={handleBoardSizeSubmit} />;
    }

    return (
        <div className="app">
            <div className="main-background">
                <Timer />
                <Board size={boardSize} />
                <SVGIcon name="menu" onClick={() => togglePanel('menu')} className="icon menu-icon" />
                <SVGIcon name="settings" onClick={() => togglePanel('settings')} className="icon settings-icon" />
                <SVGIcon name="exit" onClick={() => togglePanel('exit')} className="icon exit-icon" />
                {activePanel === 'menu' && <MenuPanel onClose={closePanel} closing={closingPanel === 'menu'} />}
                {activePanel === 'settings' && <SettingsPanel onClose={closePanel} closing={closingPanel === 'settings'} />}
                {activePanel === 'exit' && <ExitPanel onClose={closePanel} closing={closingPanel === 'exit'} />}
            </div>
        </div>
    );
};

export default App;
