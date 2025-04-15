import Button from "./Button"
import './DiaryList.css'
import DiaryItem from './DiaryItem';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const DiaryList = ({ data }) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState('latest');

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                return a.createDate - b.createDate;
            } else {
                return b.createDate - a.createDate;
            }
        });
    };

    const sortedData = getSortedData();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select value={sortType} onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button text={"새 일기 쓰기"} type={"green"} onClick={() => nav("/new")} />
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => (
                    <DiaryItem {...item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
