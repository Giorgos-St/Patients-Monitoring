import styles from './MetricCard.module.css'

const MetricCard = ({ title, unit, value, variant = 'blue' }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {unit && <div className={styles.unit}>{unit}</div>}
      </div>
      <div className={`${styles.footer} ${styles[variant]}`}>
        <div className={styles.value}>{value ?? '—'}</div>
      </div>
    </div>
  )
}

export default MetricCard
