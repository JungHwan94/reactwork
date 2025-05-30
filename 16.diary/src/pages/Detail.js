import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { getEmotionImg } from "../util/emotion-img";
import { DiaryStateContext } from "../App"
import { useContext } from "react"

const Detail = (() => {
    const params = useParams();
    const nav = useNavigate();
    const data = useContext(DiaryStateContext);

    const emotionItem = data.find(
        (item) => item.emotionId == params.id
    );
    return (
        <div>
            <Header
                title={'상세보기'}
                leftChild={
                <Button text={"< 뒤로 가기"} onClick={() => nav(-1)}/>
                }
                rightChild={
                <Button text={"수정하기"}  onClick={() => nav('/edit/emotionItem.id')}/>
                }  
            />
            <section className="img_section">
                <h3>오늘의 감정</h3>
                <div>
                    <img src={getEmotionImg(emotionItem.emotionId)} />
                    <div>{emotionItem.emotionName}</div>
                </div>
            </section>
            <section className="content_section">
                <h3>오늘의 일기</h3>
                <div className="content_wrapper">
                    {emotionItem.content}
                </div>
            </section>
        </div>
    )
})
export default Detail