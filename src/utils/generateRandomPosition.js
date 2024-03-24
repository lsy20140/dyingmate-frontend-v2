// 버킷리스트 보드에서 랜덤으로 위치를 설정하기 위한 함수
const MAX_X = 1000
const MIN_X = 0

const MAX_Y = 500
const MIN_Y = 0

export const getRandomXPos = () => {
  return ( Math.random() * (MAX_X - MIN_X) ) + MIN_X
}

export const getRandomYPos = () => {
  return ( Math.random() * (MAX_Y - MIN_Y) ) + MIN_Y
}

