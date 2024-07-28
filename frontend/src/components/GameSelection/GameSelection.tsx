import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GameSelection.module.css';

const GameSelection: React.FC = () => {
  const navigate = useNavigate();
  const [showModePopup, setShowModePopup] = useState(false);
  const [activeTab, setActiveTab] = useState('myGames');

  const handleGameClick = () => {
    setShowModePopup(true);
  };

  const handleModeSelect = (mode: string) => {
    setShowModePopup(false);
    navigate('/board-dimensions');
  };

  const closePopup = () => {
    setShowModePopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Select, or create a game</div>
      <div className={styles.contentFlex}>
        <div className={styles.left}>
          <div className={styles.newGameButton}>
            <svg viewBox="0 0 199 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.4286 21.625C24.5196 21.625 21.3214 24.8312 21.3214 28.75V171.25C21.3214 175.169 24.5196 178.375 28.4286 178.375H170.571C174.48 178.375 177.679 175.169 177.679 171.25V28.75C177.679 24.8312 174.48 21.625 170.571 21.625H28.4286ZM0 28.75C0 13.0305 12.7484 0.25 28.4286 0.25H170.571C186.252 0.25 199 13.0305 199 28.75V171.25C199 186.97 186.252 199.75 170.571 199.75H28.4286C12.7484 199.75 0 186.97 0 171.25V28.75ZM88.8393 139.188V110.688H60.4107C54.5029 110.688 49.75 105.923 49.75 100C49.75 94.0773 54.5029 89.3125 60.4107 89.3125H88.8393V60.8125C88.8393 54.8898 93.5922 50.125 99.5 50.125C105.408 50.125 110.161 54.8898 110.161 60.8125V89.3125H138.589C144.497 89.3125 149.25 94.0773 149.25 100C149.25 105.923 144.497 110.688 138.589 110.688H110.161V139.188C110.161 145.11 105.408 149.875 99.5 149.875C93.5922 149.875 88.8393 145.11 88.8393 139.188Z" fill="white" fillOpacity="0.33" />
            </svg>
          </div>
          <div className={styles.limeBg}>
            <div className={styles.sectionTitle}>Recent games</div>
            <div className={styles.gamesList}>
              <div className={styles.gameItem} onClick={handleGameClick}>Game 1</div>
              <div className={styles.gameItem} onClick={handleGameClick}>Game 2</div>
              <div className={styles.gameItem} onClick={handleGameClick}>A</div>
              <div className={styles.gameItem} onClick={handleGameClick}>B</div>
              <div className={styles.gameItem} onClick={handleGameClick}>Cd</div>
              <div className={styles.gameItem} onClick={handleGameClick}>Efg hi</div>
              <div className={styles.gameItem} onClick={handleGameClick}>Jkl m</div>
              <div className={styles.gameItem} onClick={handleGameClick}>N</div>
            </div>
          </div>
        </div>
        <div className={`${styles.right} ${styles.limeBg}`}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === 'myGames' ? styles.active : ''}`}
              onClick={() => setActiveTab('myGames')}
            >
              My games
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'examples' ? styles.active : ''}`}
              onClick={() => setActiveTab('examples')}
            >
              Examples
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'public' ? styles.active : ''}`}
              onClick={() => setActiveTab('public')}
            >
              Public
            </button>
          </div>

          <div className={styles.gamesList}>
            <div className={styles.gameItem} onClick={handleGameClick}>Game 1</div>
            <div className={styles.gameItem} onClick={handleGameClick}>Game 2</div>
            <div className={styles.gameItem} onClick={handleGameClick}>A</div>
            <div className={styles.gameItem} onClick={handleGameClick}>B</div>
            <div className={styles.gameItem} onClick={handleGameClick}>Cd</div>
            <div className={styles.gameItem} onClick={handleGameClick}>Efg hi</div>
            <div className={styles.gameItem} onClick={handleGameClick}>Jkl m</div>
            <div className={styles.gameItem} onClick={handleGameClick}>N</div>
          </div>
        </div>
      </div>

      {showModePopup && (
        <div className={styles.overlay} onClick={closePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div>Select the mode:</div>
            <button className={styles.modeButton} onClick={() => handleModeSelect('play')}>Play</button>
            <button className={styles.modeButton} onClick={() => handleModeSelect('edit')}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSelection;
