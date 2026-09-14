import styles from "../../pages/Home.module.css";

import bgBlue from "../../assets/bg_blue.svg";
import bgGreen from "../../assets/bg_green.svg";
import bgDesk from "../../assets/bg_img_desk.svg";
import bgPlant from "../../assets/bg_img_plant.svg";
import bgTile from "../../assets/bg_img_tile.svg";
import bgWindow from "../../assets/bg_img_window.svg";
import bgPink from "../../assets/bg_pink.svg";
import bgYellow from "../../assets/bg_yellow.svg";

// 백엔드에서 오는 background 값과 실제 이미지 연결
const BACKGROUND_MAP = {
  bgBlue,
  bgGreen,
  bgDesk,
  bgPlant,
  bgTile,
  bgWindow,
  bgPink,
  bgYellow,
};

// 사진형 배경
const IMAGE_BACKGROUNDS = ["bgPlant", "bgDesk", "bgTile", "bgWindow"];

function LogCard({
  background,
  description,
  elapsedDays,
  name,
  point,
  reactions = [],
  onClick,
}) {
  const backgroundImage = BACKGROUND_MAP[background];

  const isImageBackground = IMAGE_BACKGROUNDS.includes(background);

  // count가 많은 순서대로 정렬한 뒤 최대 3개만 사용
  const topReactions = [...reactions]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <article
      className={`${styles.logsCard} ${
        isImageBackground ? styles.logsCardImageType : ""
      }`}
      onClick={onClick}
    >
      {/* 배경 이미지 */}
      {backgroundImage && (
        <img
          alt=""
          src={backgroundImage}
          className={styles.logsCardBackground}
        />
      )}

      {/* 사진 배경일 때 어두운 오버레이 */}
      {isImageBackground && <div className={styles.logsCardOverlay} />}

      {/* 카드 실제 내용 */}
      <div className={styles.logsCardContent}>
        <div className={styles.logsCardHeader}>
          <div>
            <h3 className={styles.logsCardTitle}>{name}</h3>

            <p className={styles.logsCardDate}>{elapsedDays}일째 진행 중</p>
          </div>

          <span className={styles.logsCardPoint}>🌿 {point}P 획득</span>
        </div>

        <p className={styles.logsCardDescription}>{description}</p>

        <div className={styles.logsCardReactions}>
          {topReactions.map((reaction) => (
            <span key={reaction.emoji} className={styles.logsCardReaction}>
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default LogCard;
