import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Login() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [photo, setPhoto] = useState(null)
  const [attendanceList, setAttendanceList] = useState([])
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && attendance.trim()) {
      if (photo) {
        const reader = new FileReader()
        reader.onload = () => {
          const photoData = reader.result
          const newEntry = { name, attendance, photo: photoData, status: 'Hadir' }
          const updatedList = [...attendanceList, newEntry]
          setAttendanceList(updatedList)
          localStorage.setItem('attendanceData', JSON.stringify(updatedList))
          setName('')
          setAttendance('')
          setPhoto(null)
          alert('Foto berhasil diupload dan data absensi ditambahkan!')
        }
        reader.readAsDataURL(photo)
      } else {
        const newEntry = { name, attendance, photo: null, status: 'Hadir' }
        const updatedList = [...attendanceList, newEntry]
        setAttendanceList(updatedList)
        localStorage.setItem('attendanceData', JSON.stringify(updatedList))
        setName('')
        setAttendance('')
        setPhoto(null)
        alert('Data absensi ditambahkan tanpa foto!')
      }
    } else {
      alert('Silakan masukkan nama dan absensi Anda.')
    }
  }

  const handleProceed = () => {
    if (attendanceList.length > 0) {
      navigate('/dashboard')
    } else {
      alert('Silakan tambahkan setidaknya satu data absensi.')
    }
  }

  return (
    <div className="App">
      <h1>Daftar Hadir</h1>
      <p>Silahkan Isi Daftar Kehadiran Anda</p>
      <form onSubmit={handleSubmit} className="card">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama Anda"
        />
        <select
          className="attendance-select"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        >
          <option value=""> Status Absensi</option>
          <option value="Hadir">✅ Hadir</option>
          <option value="Izin">⚠️ Izin</option>
          <option value="Sakit">🏥 Sakit</option>
        </select>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Upload Foto</button>
      </form>
      <button onClick={handleProceed} className="proceed-btn">Input/Kirim</button>
      {attendanceList.length > 0 && (
        <div className="attendance-preview">
          <h3>Pratinjau Daftar Hadir:</h3>
          <ul>
            {attendanceList.map((item, index) => (
              <li key={index}>
                <span>{item.name} - {item.attendance}</span>
                {item.photo && <img src={item.photo} alt="Foto" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Login
