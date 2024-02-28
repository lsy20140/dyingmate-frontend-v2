import { createContext, useContext, useState } from "react";

const StageContext = createContext()

export const StageContextProvider = ({children}) => {
  const [stage, setStage] = useState({})
  const [comeOutRoom, setComeOutRoom] = useState(0)

  return (
    <StageContext.Provider value={{
      stage, setStage,
      comeOutRoom, setComeOutRoom
    }}>
      {children}
    </StageContext.Provider>
  )

}

export function useStageContext() {
  return useContext(StageContext)
}