import { useTheme } from "../../context/ThemeContext"
import "./DarkModeToggle.scss"

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="toggle-icon">{isDarkMode ? "🌙" : "☀️"}</span>
        </div>
      </div>
    </button>
  )
}

export default DarkModeToggle
