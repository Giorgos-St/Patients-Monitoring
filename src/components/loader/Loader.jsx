import { BarLoader } from 'react-spinners'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <BarLoader color="var(--accent)" width={160} height={4} aria-label="Loading" />
    </div>
  )
}

export default Loader
