//컴포넌트로 반환하는 이름은 대문자로 시작해야함 소문자로 작성하면 DOM 태그로 인식함

import React from 'react'

export default function Logs(props) {
  return (
    <>
      <h2>기록</h2> 
      <ol> { //logs를 순차적으로 돌면서 안에있는 하나의 인자를 받아서 리턴해줌
        props.logs.map((log, index) => {
          return (
            //li안에 Key 값을 넣어줘야함 안그럼 오류 뜸 키값은 리액트에서 렌더링시 효율적으로 하기 위해 넣어주는 거임
            //안넣어주면 리스트에서 하나라도 아이템이 바뀌면 다시 다 렌더링 하기 때문에 불피요한 렌더링이 많아져서 성능저하됨 그래서 경고 뜸
            //보통 아이디 값을 넣어주는 데 지금은 없으니 그냥 넣어줌
            <li key = {`${log}_${index}`}>{log}</li>
          )
        })
      } 
      </ol> 
    </>
  )
}
