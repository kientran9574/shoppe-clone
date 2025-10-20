import { createContext, useContext, useState, type ReactNode } from 'react'
import { getAccessTokenLS, getProfileToLS } from '../utils/utils'
import type { User } from '../types/user.types'

interface IAppContext {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: IAppContext = {
  isAuthenticated: Boolean(getAccessTokenLS()),
  setAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null
}

const AppContext = createContext(initialAppContext)
export const useAppContext = () => {
  return useContext(AppContext)
}
export default function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
