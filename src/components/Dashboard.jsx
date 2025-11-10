import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Dashboard() {
  const [attendanceList, setAttendanceList] = useState([])
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('attendanceData'))
    if (data && data.length > 0) {
      setAttendanceList(data)
    } else {
      navigate('/')
    }
  }, [navigate])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const handleLogout = () => {
    localStorage.removeItem('attendanceData')
    navigate('/')
  }

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="title">Dashboard Daftar Hadir</h1>
            <p>Data absensi yang telah diinput.</p>
          </div>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </header>
      <div className="names-list">
        <div className="table-header">
          <h3>Daftar Hadir:</h3>
          <button className="logout-btn-table" onClick={handleLogout}>Logout</button>
        </div>
        <table className="preview-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Absen</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.attendance}</td>
                  <td>
                    {item.photo && <img src={item.photo} alt="Foto" style={{ width: '50px', height: '50px' }} />}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>
                  Belum ada data absensi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
