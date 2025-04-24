import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './calories.css';

const Calories = () => {
  const [foods, setFoods] = useState([]);  // 음식 목록을 저장할 상태
  const [search, setSearch] = useState("");  // 검색어 상태
  const [searchResults, setSearchResults] = useState([]);  // 검색 결과 상태
  const [grams, setGrams] = useState("");  // 사용자가 입력한 그램 수
  const [calories, setCalories] = useState(0);  // 계산된 칼로리
  const [selectedFood, setSelectedFood] = useState(null);  // 선택된 음식 상태
  const [meals, setMeals] = useState({
    아침: [],
    점심: [],
    저녁: [],
  });  // 각 식사에 추가된 음식들
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 관리

  const itemsPerPage = 10;  // 한 페이지당 보이는 음식 개수

  // 음식 목록 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:8080/foods')
      .then((response) => {
        setFoods(response.data);  // 데이터 받아서 상태 업데이트
        setIsLoading(false);  // 로딩 종료
      })
      .catch((error) => {
        console.error("Error fetching foods", error);
        setIsLoading(false);  // 오류가 나더라도 로딩 종료
      });
  }, []);

  // 음식 검색 처리
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (keyword.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = foods.filter((food) =>
      food.name.includes(keyword)
    );
    setSearchResults(filtered);
  };

  // 그램 수에 맞게 칼로리 계산
  const calculateCalories = (food, grams) => {
    return (food.calories * (grams / 100));
  };

  // 그램 수 입력 처리
  const handleGramsChange = (e) => {
    const gramsValue = e.target.value;
    setGrams(gramsValue);
    if (selectedFood) {
      const calculatedCalories = calculateCalories(selectedFood, gramsValue);
      setCalories(calculatedCalories);
    }
  };

  // 음식 선택 처리
  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setCalories(0);  // 칼로리 초기화
    setGrams("");  // 그램 수 초기화
  };

  // 식사에 음식 추가
  const addFoodToMeal = (meal) => {
    if (selectedFood && grams) {
      const foodWithCalories = {
        ...selectedFood,
        grams,
        calories: calculateCalories(selectedFood, grams), // 해당 음식의 칼로리 계산
      };

      setMeals((prev) => ({
        ...prev,
        [meal]: [...prev[meal], foodWithCalories],
      }));

      // 초기화
      setSearch("");  // 검색어 초기화
      setSearchResults([]);  // 검색 결과 초기화
      setSelectedFood(null);  // 선택된 음식 초기화
      setGrams("");  // 그램 수 초기화
      setCalories(0);  // 칼로리 초기화
    }
  };

  // 저장 버튼 클릭 시 음식 섭취 기록 저장
  const saveFoodLog = () => {
    if (selectedFood && grams) {
      axios
        .post('http://localhost:8080/food-logs', {
          foodId: selectedFood.foodId,  // 음식 ID
          quantity: grams,  // 사용자가 입력한 그램 수
          totalCalories: calories,  // 계산된 칼로리
          logDate: new Date(),  // 현재 날짜 (음식 섭취 날짜)
        })
        .then((response) => {
          console.log('음식 섭취 기록 저장 성공', response.data);
        })
        .catch((error) => {
          console.error('음식 섭취 기록 저장 실패', error);
        });
    }
  };

  // 총 칼로리 계산
  const getTotalCalories = () => {
    return Object.values(meals)
      .flat()
      .reduce((total, food) => total + food.calories, 0);
  };

  return (
    <div className="calories-container">
      <h2>섭취 칼로리</h2>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="음식 검색"
        value={search}
        onChange={handleSearch}
      />

      {/* 음식 목록 (검색 결과 및 일반 목록) */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {(searchResults.length ? searchResults : foods)
            .slice(0, itemsPerPage)
            .map((food, idx) => (
              <div className="search-result" key={idx}>
                <span>{food.name} - {food.calories} kcal</span>
                <button onClick={() => handleSelectFood(food)}>선택</button>
              </div>
            ))}
        </div>
      )}

      {/* 그램 수 입력 */}
      {selectedFood && (
        <div>
          <input
            type="number"
            placeholder="그램 수 입력"
            value={grams}
            onChange={handleGramsChange}
          />
          <p>계산된 칼로리: {calories.toFixed(2)} kcal</p>
        </div>
      )}

      {/* 식사에 음식 추가 */}
      {selectedFood && grams && (
        <div>
          <button onClick={() => addFoodToMeal("아침")}>아침에 추가</button>
          <button onClick={() => addFoodToMeal("점심")}>점심에 추가</button>
          <button onClick={() => addFoodToMeal("저녁")}>저녁에 추가</button>
        </div>
      )}

      {/* 선택된 음식 표시 */}
      {selectedFood && (
        <div className="selected-food-container">
          <h3>선택된 음식: {selectedFood.name}</h3>
          <p>칼로리: {selectedFood.calories} kcal (100g 기준)</p>
        </div>
      )}

      {/* 식사별 음식 목록 */}
      <div className="meal-grid">
        {["아침", "점심", "저녁"].map((meal) => (
          <div className="meal-square" key={meal}>
            <h3>{meal}</h3>
            <div className="meal-items">
              {meals[meal].map((food, idx) => (
                <div key={idx} className="food-item">
                  <span>{food.name} ({food.grams}g) - {food.calories.toFixed(2)} kcal</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 총 칼로리 표시 */}
        <div className="meal-square total-calories-box">
          총 칼로리: {getTotalCalories().toFixed(2)} kcal
        </div>
      </div>
    </div>
  );
};

export default Calories;
