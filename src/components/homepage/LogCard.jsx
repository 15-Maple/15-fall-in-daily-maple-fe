// Home 페이지 CSS Module import
import styles from "../../pages/Home.module.css";

import bgBlue from "../../assets/bg_blue.svg";
import bgGreen from "../../assets/bg_green.svg";
import bgDesk from "../../assets/bg_img_desk.svg";
import bgPlant from "../../assets/bg_img_plant.svg";
import bgTile from "../../assets/bg_img_tile.svg";
import bgWindow from "../../assets/bg_img_window.svg";
import bgPink from "../../assets/bg_pink.svg";
import bgYellow from "../../assets/bg_yellow.svg";

// API 또는 목업데이터의 background 값과
// 실제 SVG 이미지 파일을 연결하는 객체
const BACKGROUND_MAP = {
  blue: bgBlue,
  green: bgGreen,
  desk: bgDesk,
  plant: bgPlant,
  tile: bgTile,
  window: bgWindow,
  pink: bgPink,
  yellow: bgYellow,
};

function LogCard({
  background,
  description,
  elapsedDays,
  name,
  point,
  reactions = [],
}) {
  // background 값에 해당하는 실제 SVG 이미지 가져오기
  const backgroundImage = BACKGROUND_MAP[background];

  return (
    <article className={styles.logsCard}>
      {/* 카드 배경 이미지 */}
      {backgroundImage && (
        <img
          alt=""
          src={backgroundImage}
          className={styles.logsCardBackground}
        />
      )}

      {/* 카드 안 실제 내용 */}
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
          {reactions.map((reaction) => (
            <span key={reaction.emoji}>
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default LogCard;
