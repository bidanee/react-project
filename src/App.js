import {
  useState,
  useEffect
} from 'react';
import './App.css';
import Logs from './components/Logs.js';
import {
  generateRandomNumber
} from './components/Random';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber())
  const [answer, setAnswer] = useState('')
  const [logs, setLogs] = useState([])
  const [isSuccess, setIsSuccess] = useState(false);
  //useEffect 두번째 인자에 아무것도 없으면 바뀔때 마다 있으면 두번째 인자가 바뀔때 마다 리렌더링됨?? 이게 맞냐?
  useEffect(() => {
    console.log(randomNumber)
  }, [randomNumber])

  const handleAnswerChanged = (e) => {
    // console.log(e.target.value)
    setAnswer(e.target.value)
  }

  const handleSubmit = () => {
    //스트라이크, 볼, 정답 유무
    //자리수 마다 비교해줘야하기때문에 answer.split('')사용해서 배열로 바꿔줌
    const answers = answer.split('').map(item => Number(item))

    // some() 안에있는게 하나라도 true면 true를 반환
    if (answers.some(v => isNaN(v))) {
      alert('숫자만 입력해 주세요')
      return
    }
    if(answers.length < 4) {
      alert('숫자가 적어유');
      return
    } 
    if(answer.length > 5) {
      alert('숫자가 너무 많아유') 
      return;}  
    
    const isDuplicate = answers.some((number) => {
      /* [1,2,3,4]
        -> 앞에서 탐색 Index 0, 뒤에서 탐색 index 0 
        [1,1,2,3]
        -> 앞에서 탐색 index 0, 뒤에서 탐색 index 1*/
      return answers.indexOf(number) !== answers.lastIndexOf(number)
    })
    if(isDuplicate) {
      alert('중복 노노')
      return;
    }

    //reduce의 두번째 인자는 초기값
    const {
      strike,
      ball
    } = randomNumber.reduce((prev, cur, index) => {
      //같은 자리에 같은 수가 존재하면 스트라이크
      if (answers[index] === cur) {
        return { //계속 이전값 갱신해줘야함 그래서 '...' 붙임
          //prev는 초기값인데 객체내의 strike와 ball을 나열해줌 
          ...prev, // 즉 => strike : prev.strike, ball : prev.ball 과 같음
          strike: prev.strike + 1
        }
      }

      //다른 자리에 수가 존재하면 볼
      if (answers.includes(cur)) {
        return {
          ...prev,
          ball: prev.ball + 1
        }
      }

      return prev;
    }, {
      strike: 0,
      ball: 0
    })

    if (strike === 4) {
      alert('정답쓰!!!!')
      setLogs([...logs, `${answer} 정답입니다 ~!~!`])
      setIsSuccess(true);
      return;
    }

    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`])
  }

  const handleRetry = () => { //초기화 시키기
    setRandomNumber(generateRandomNumber())
    setAnswer('')
    setLogs([])
    setIsSuccess(false)
  }


  return ( 
    <div className = "App" >
      <h1> 숫자 야구 게임 </h1> 
      <header className = 'header'> {
        isSuccess ? `정답은 : ${answer}` : 'O O O O'
      } </header> 
      <section>
        <input type = "text" value = {answer} onChange = {handleAnswerChanged} disabled = {isSuccess} /> 
        {isSuccess ? (<button onClick = {handleRetry}>다시하기</button>) : (<button onClick={handleSubmit}>맞춰보기</button>)} 
      </section> 
      <Logs logs={logs}/>
    </div >
  );
}

export default App;