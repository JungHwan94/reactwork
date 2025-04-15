import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import emotionList, { getEmotionImg } from '../util/emotion-img';

const dummyData = [
  {
    id: 1,
    content: "오늘은 날씨가 좋아서 기분이 좋았다.",
    emotionId: 2,
    createDate: new Date("2023-04-01"),
  },
  {
    id: 2,
    content: "조금 피곤한 하루였다.",
    emotionId: 6,
    createDate: new Date("2023-04-05"),
  },
];

const Detail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const target = dummyData.find((it) => it.id === parseInt(id));
    if (target) {
      setData(target);
    } else {
      alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
  }, [id, nav]);

  const getStringDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  if (!data) return <div>로딩 중...</div>;

  const emotion = emotionList.find((it) => it.emotionId === data.emotionId);

  return (
    <div className="Detail">
      <h2>{getStringDate(data.createDate)}의 일기</h2>
      <section>
        <h4>오늘의 감정</h4>
        <div className="emotion_detail">
          <img src={emotion.img} alt={emotion.emotionName} />
          <span>{emotion.emotionName}</span>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <p>{data.content}</p>
      </section>
      <div className="btn_area">
        <Button text="뒤로가기" onClick={() => nav(-1)} />
        <Button text="수정하기" type="green" onClick={() => nav(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default Detail;
