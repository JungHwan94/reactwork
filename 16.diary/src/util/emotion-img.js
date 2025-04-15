import emotion1 from '../resources/img/emotion1.png';
import emotion2 from '../resources/img/emotion2.png';
import emotion3 from '../resources/img/emotion3.png';
import emotion4 from '../resources/img/emotion4.png';
import emotion5 from '../resources/img/emotion5.png';
import emotion6 from '../resources/img/emotion6.png';
import emotion7 from '../resources/img/emotion7.png';

export function getEmotionImg(emotionId) {
    switch(emotionId) {
        case 1 : return emotion1;
        case 2 : return emotion2;
        case 3 : return emotion3;
        case 4 : return emotion4;
        case 5 : return emotion5;
        case 6 : return emotion6;
        case 7 : return emotion7;
        default : return null;
    }
}

const emotionList = [
    { emotionId: 1, emotionName: "기쁨", img: emotion1 },
    { emotionId: 2, emotionName: "만족", img: emotion2 },
    { emotionId: 3, emotionName: "당황", img: emotion3 },
    { emotionId: 4, emotionName: "화남", img: emotion4 },
    { emotionId: 5, emotionName: "슬픔", img: emotion5 },
    { emotionId: 6, emotionName: "걱정", img: emotion6 },
    { emotionId: 7, emotionName: "울음", img: emotion7 },
];

export default emotionList;
