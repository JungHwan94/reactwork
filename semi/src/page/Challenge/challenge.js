import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './challenge.css';

function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('전체');
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userId');
    if (!stored) {
      alert('로그인이 필요합니다');
      window.location.href = '/login';
    } else {
      setUserId(stored);
    }
  }, []);

  useEffect(() => {
    axios.get('/api/challenges')
      .then(res => setChallenges(res.data))
      .catch(err => console.error("챌린지 로딩 실패:", err));
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/challenges/today?userId=${userId}`)
        .then(res => {
          const titles = res.data.map(item => item.challengeTitle);
          const score = res.data.reduce((acc, cur) => acc + (cur.earnedPoints || 0), 0);
          setActiveChallenges(titles);
          setMyScore(score);
        })
        .catch(err => console.error("오늘 챌린지 로딩 실패:", err));
    }
  }, [userId]);

  const handleChallengeClick = async (title) => {
    if (!activeChallenges.includes(title)) {
      try {
        await axios.post('/api/challenges/start', {
          userId,
          challengeTitle: title
        });
        setActiveChallenges(prev => [...prev, title]);
      } catch (err) {
        console.error("도전 저장 실패:", err);
        alert("서버 오류로 도전을 저장하지 못했습니다.");
      }
    }
  };

  const handleComplete = async (title) => {
    const found = challenges.find(ch => ch.title === title);
    if (!found) return;

    try {
      await axios.post('/api/challenges/complete', {
        userId,
        challengeTitle: title,
        earnedPoints: found.score
      });

      setMyScore(prev => prev + found.score);
      setActiveChallenges(prev => prev.filter(ch => ch !== title));
    } catch (err) {
      console.error("챌린지 완료 실패:", err);
      alert("서버 오류로 완료 처리에 실패했습니다.");
    }
  };

  const filteredChallenges = challenges.filter(ch =>
    (selectedLevel === '전체' || ch.level === selectedLevel) &&
    ch.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChallengeObjects = challenges.filter(ch =>
    activeChallenges.includes(ch.title)
  );

  return (
    <div className="challenge-wrapper">
      <div className="challenge-header">
        <div className="challenge-header-top">
          <h2>Challenge</h2>
          <div className="my-score">나의 점수 : {myScore}점</div>
        </div>

        <div className="challenge-box">
          {activeChallengeObjects.length > 0 ? (
            activeChallengeObjects.map((item, idx) => (
              <div className="challenge-item-with-button" key={idx}>
                <div className="challenge-info">
                  <span className="challenge-meta">[{item.level} | {item.score}점]</span>
                  <span className="challenge-title">{item.title}</span>
                </div>
                <button className="complete-button" onClick={() => handleComplete(item.title)}>
                  완료
                </button>
              </div>
            ))
          ) : (
            <p className="no-active">도전중인 챌린지가 없습니다</p>
          )}
        </div>
      </div>

      <div className="challenge-selector">
        <label htmlFor="level">레벨 선택 </label>
        <select
          id="level"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option>전체</option>
          <option>초급</option>
          <option>중급</option>
          <option>고급</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="챌린지 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="challenge-list">
        {filteredChallenges.map((challenge, index) => (
          <div className="challenge-row" key={index}>
            <div className="challenge-info">
              <span className="challenge-meta">[{challenge.level} | {challenge.score}점]</span>
              <span className="challenge-title">{challenge.title}</span>
            </div>
            <button
              className={`try-button ${activeChallenges.includes(challenge.title) ? 'active' : ''}`}
              onClick={() => handleChallengeClick(challenge.title)}
              disabled={activeChallenges.includes(challenge.title)}
            >
              {activeChallenges.includes(challenge.title) ? '도전중' : '도전하기'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenge;
