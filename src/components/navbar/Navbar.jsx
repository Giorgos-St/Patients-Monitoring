import { clearAuthHeader } from '../../api'
import { useUser } from '../../context/userContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { setUser } = useUser()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    clearAuthHeader()
    setUser(null)
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.spacer} />
      <button type="button" className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
