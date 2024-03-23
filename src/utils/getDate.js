const date = new Date();
const week = ['일', '월', '화', '수', '목', '금', '토'];

const hours = date.getHours()
const minutes = date.getMinutes()
const month = date.getMonth()
const day = date.getDate()
const dayOfWeek = week[date.getDay()]


export const getCurrentTime = () => {
  return `${hours}:${String(minutes).padStart(2,"0")}`
}

export const getDetailDate = () => {
  return `${month+1}월 ${day}일 ${dayOfWeek} ${hours}:${String(minutes).padStart(2,"0")}`
}