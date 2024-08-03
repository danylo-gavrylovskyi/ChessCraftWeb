import React from "react";
import styles from "./PieceCard.module.css";

interface PieceCardProps {
  name: string;
  character: string;
  isActive: boolean;
  onClick: () => void;
}

const PieceCard: React.FC<PieceCardProps> = ({
  name,
  character,
  isActive,
  onClick,
}) => {
  const iconStyle = {
    WebkitMaskImage: `url("/assets/SVGs/${character}.svg")`,
    maskImage: `url("/assets/SVGs/${character}.svg")`,
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.svgPlaceholder}>
        <i className={styles.icon} style={iconStyle} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default PieceCard;
