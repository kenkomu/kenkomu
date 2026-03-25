import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("portfolio-theme")
  if (savedTheme) return savedTheme === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme)

  // Listen for OS-level theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e) => {
      if (!localStorage.getItem("portfolio-theme")) {
        setIsDarkMode(e.matches)
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark-theme")
      localStorage.setItem("portfolio-theme", "dark")
    } else {
      root.classList.remove("dark-theme")
      localStorage.setItem("portfolio-theme", "light")
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

