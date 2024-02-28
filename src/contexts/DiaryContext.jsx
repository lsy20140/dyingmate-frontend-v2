import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Context = createContext();

export const DiaryContextProvider = ({ children }) => {
  const [diary, setDiary] = useState({})

  const value = useMemo(() => ({
    diary, setDiary
  }),[diary])

  return (
    <Context.Provider
      value={value}
    >
      {children}
    </Context.Provider>
  )
}

export const useDiaryContext = () => {
  const context = useContext(Context)

  if(context === undefined) {
    throw new Error("must be used within a Provider")
  }

  return context
}