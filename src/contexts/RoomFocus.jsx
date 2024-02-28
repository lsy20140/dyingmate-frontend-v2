import { createContext, useContext, useState } from "react";

const FocusContext = createContext();

export const RoomFocusProvider = ({children}) => {
  const [focus, setFocus] = useState(false);

  return (
    <FocusContext.Provider
      value={{focus, setFocus}}
    >
      {children}
    </FocusContext.Provider>
  )
}

export const useRoomFocus = () => {
  return useContext(FocusContext)
}