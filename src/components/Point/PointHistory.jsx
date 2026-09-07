//포인트 획득 내역 리스트를 표시
import { useEffect, useState } from "react";

import { getPoint } from "../../api/point";

import pointIcon from "../../assets/ic-point.svg";

import styles from "./PointHistory.module.css";

function PointHistory() {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const fetchPoint = async () => {
      //로그아이디로 수정예정
      const responses = await getPoint(1);

      setPoint(responses.points);
    };
    fetchPoint();
  }, []);

  return (
    <section className={styles.pointHistory}>
      <div className={styles.pointBox}>
        <img alt="포인트 아이콘" src={pointIcon} className={styles.pointIcon} />
        <span>{point}P 획득</span>
      </div>
    </section>
  );
}

export default PointHistory;
