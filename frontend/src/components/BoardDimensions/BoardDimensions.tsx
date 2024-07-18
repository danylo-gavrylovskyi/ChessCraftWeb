import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardDimensions.module.css';

const BoardDimensions: React.FC = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>Define the board dimensions</div>
      <div className={styles.grid}>
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className={styles.cell}></div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <label>
          Rows: 
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            className={styles.input}
          />
        </label>
        <label>
          Columns: 
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate('/')}>Prev</button>
        <button className={styles.button}>Next</button>
      </div>
    </div>
  );
};

export default BoardDimensions;
