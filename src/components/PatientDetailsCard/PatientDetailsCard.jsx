import styles from './PatientDetailsCard.module.css'

const PatientDetailsCard = ({ firstname, lastname }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>Patient Details</div>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles.label}>Name:</div>
          <div className={styles.value}>{firstname ?? '—'}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Surname:</div>
          <div className={styles.value}>{lastname ?? '—'}</div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetailsCard
