import { useNavigate } from "react-router-dom"
import Button from "./Button"
import './Editor.css'
import EmotionItem from "./EmotionItem"
import { useEffect, useState } from 'react'

const emotionList = [
    {
        emotionId : 1,
        emotionName : "기쁨"
    },
    {
        emotionId : 2,
        emotionName : "만족"
    },
    {
        emotionId : 3,
        emotionName : "당황"
    },
    {
        emotionId : 4,
        emotionName : "화남"
    },
    {
        emotionId : 5,
        emotionName : "슬픔"
    },
    {
        emotionId : 6,
        emotionName : "걱정"
    },
    {
        emotionId : 7,
        emotionName : "울음"
    },
]

const getStringDate = (targetDate) => {
    // yyyy-01-01
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate()
    if(month < 10) {
        month = `0${month}`;
    }
    if(date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}


const Editor = ({onSubmit, initData}) => {
    const nav = useNavigate();

    useEffect(() => {
        if(initData) {
            setInput({
                ...initData,
                createDate : new Date(initData.createDate)
            })
        }
    },[initData])
    
    const getStringDate = (targetDate) => {
        // yyyy-01-01
        let year = targetDate.getFullYear();
        let month = targetDate.getMonth() + 1;
        let date = targetDate.getDate()
        if(month < 10) {
            month = `0${month}`;
        }
        if(date < 10) {
            date = `0${date}`;
        }
        return `${year}-${month}-${date}`;
    }

    const [input, setInput] = useState({
        createDate : new Date(),
        emotionId : 4,
        content : ""
    })

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name == "createDate") {
            value = new Date(value);  // String을 Date로 바꿔서 넣어줌
        }

        setInput({
            ...input, [name] : value
        })
    }
    
    return (
        <div className="Editor">
            <section>
                <h3>오늘 날짜</h3>
                <input 
                    name="createDate" 
                    type="date" 
                    value={getStringDate(input.createDate)}
                    onChange={onChangeInput} 
                />
            </section>
            <section>
                <h3>오늘의 감정</h3>
                <div className="emotion_list">
                    {
                        emotionList.map((item) => (
                            <EmotionItem
                                onClick={() => 
                                    onChangeInput({
                                        target : {
                                            name : "emotionId",
                                            value : item.emotionId
                                        }
                                    })
                                }
                                {...item}
                                isSelected={item.emotionId == input.emotionId}
                            />
                        ))
                    }
                </div>
            </section>
            <section>
                <h3>오늘의 일기</h3>
                <textarea rows="5" cols="63" name="content" 
                    value={input.content} 
                    onChange={onChangeInput}
                />
            </section>
            <section className="editor_btn">
                <Button text={"취소하기"} onClick={() => nav(-1)}/>
                <Button text={"작성완료"} type={"green"} onClick={() => {onSubmit(input)}}/>
            </section>
        </div>
    )
}
export default Editor