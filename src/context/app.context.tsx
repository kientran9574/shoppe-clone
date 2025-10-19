import { createContext, useContext, useState, type ReactNode } from 'react'
import { getAccessTokenLS } from '../utils/utils'

interface IAppContext {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: IAppContext = {
  isAuthenticated: Boolean(getAccessTokenLS()),
  setAuthenticated: () => null
}

const AppContext = createContext(initialAppContext)
export const useAppContext = () => {
  return useContext(AppContext)
}
export default function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(initialAppContext.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
