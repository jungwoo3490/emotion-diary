import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]); // 해당 월에 작성된 일기들만 필터링
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
        ).getTime();

        setData(diaryList.filter((it) => it.date >= firstDay && it.date <= lastDay));
    }, [curDate, diaryList]);
    
    useEffect(() => {
        console.log(data);
    });
    

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeader headText={headText} 
            leftChild={<MyButton text={'<'} onClick={decreaseMonth} />} 
            rightChild={<MyButton text={'>'} onClick={increaseMonth} />}/>
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;