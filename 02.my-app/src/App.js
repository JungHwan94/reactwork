import logo from './logo.svg';
import './App.css';
/*
// 2. style을 변수에 객체로 저장하여 사용
function App() {
  const style = {
    div: {
      backgroundColor: 'skyblue',
      padding: '30px',
      textAlign: 'center',
      fontsize: '15px'
    },
    h1: {},
    h3: {},
    class1: {},
    id2: {}
  }
  return (
    <div style={style.div}>
      <h1>더조은에 오신것을 환영</h1>
      <h3>JAVAJAVAJAVA</h3>
      <p className="class1">reactttttt</p>
      <p id="id2">IDIDID</p>
    </div>
  );
}
*/
// 3. inline방식으로 style 주기
function App() {
  return (
    <div style={ {textAlign:'center'} }>
      <h1 style={{color:'orange'}}>더조은에 오신것을 환영</h1>
      <h3 style={{color:'blue', background:'purple'}}>JAVAJAVAJAVA</h3>
      <p className="class1">reactttttt</p>
      <p id="id2">IDIDID</p>
    </div>
  );
}

export default App;
