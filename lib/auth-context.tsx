"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  authenticate: (pin: string) => boolean
  logout: () => void
  checkAuth: () => boolean
  attemptCount: number
  isBlocked: boolean
  blockTimeRemaining: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MAX_ATTEMPTS = 3
const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0)

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const authStatus = sessionStorage.getItem("gallery_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }

    // Check if user is currently blocked
    const blockData = localStorage.getItem("gallery_block")
    if (blockData) {
      const { blockedUntil, attempts } = JSON.parse(blockData)
      const now = Date.now()

      if (now < blockedUntil) {
        setIsBlocked(true)
        setAttemptCount(attempts)
        setBlockTimeRemaining(blockedUntil - now)

        // Start countdown timer
        const timer = setInterval(() => {
          const remaining = blockedUntil - Date.now()
          if (remaining <= 0) {
            setIsBlocked(false)
            setAttemptCount(0)
            setBlockTimeRemaining(0)
            localStorage.removeItem("gallery_block")
            clearInterval(timer)
          } else {
            setBlockTimeRemaining(remaining)
          }
        }, 1000)

        return () => clearInterval(timer)
      } else {
        // Block expired, clean up
        localStorage.removeItem("gallery_block")
        setAttemptCount(0)
      }
    }
  }, [])

  const authenticate = (pin: string): boolean => {
    if (isBlocked) {
      return false
    }

    const correctPin = process.env.NEXT_PUBLIC_GALLERY_SECURITY_PIN

    if (!correctPin) {
      console.error("Security pin not configured in environment variables")
      return false
    }

    if (pin === correctPin) {
      setIsAuthenticated(true)
      setAttemptCount(0)
      sessionStorage.setItem("gallery_auth", "true")
      localStorage.removeItem("gallery_block")
      return true
    } else {
      const newAttemptCount = attemptCount + 1
      setAttemptCount(newAttemptCount)

      if (newAttemptCount >= MAX_ATTEMPTS) {
        const blockedUntil = Date.now() + BLOCK_DURATION
        setIsBlocked(true)
        setBlockTimeRemaining(BLOCK_DURATION)

        localStorage.setItem(
          "gallery_block",
          JSON.stringify({
            blockedUntil,
            attempts: newAttemptCount,
          }),
        )

        // Start countdown timer
        const timer = setInterval(() => {
          const remaining = blockedUntil - Date.now()
          if (remaining <= 0) {
            setIsBlocked(false)
            setAttemptCount(0)
            setBlockTimeRemaining(0)
            localStorage.removeItem("gallery_block")
            clearInterval(timer)
          } else {
            setBlockTimeRemaining(remaining)
          }
        }, 1000)
      }

      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("gallery_auth")
  }

  const checkAuth = (): boolean => {
    return isAuthenticated && !isBlocked
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        logout,
        checkAuth,
        attemptCount,
        isBlocked,
        blockTimeRemaining,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
