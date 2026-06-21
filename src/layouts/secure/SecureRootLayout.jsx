import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import styles from './SecureRootLayout.module.css'

export default function SecureRootLayout() {
    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
