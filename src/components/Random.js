export function generateRandomNumber() {
  //0 ~ 9 까지
  const candidates = [0,1,2,3,4,5,6,7,8,9]
  //random하게 섞어서 4자리 숫자만 이용
  const pickNumbers = shuffle(candidates).splice(0,4);
  return pickNumbers
}

//shuffle에 array받아서 랜덤하게 섞어서 반환할꺼임
function shuffle(array) {
  // Math.random(), 0 ~ 1까지 랜덤하게 뽑아주는 함수

  //array.sort(()=>음수 내림,양수 오름)
  return array.sort(() => {
    return Math.random() - 0.5 // -0.5~ 0.5
  })
}
//왜 위와 같은 방법을 썼을까?
/* function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
      const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
  }
  return array;
} */