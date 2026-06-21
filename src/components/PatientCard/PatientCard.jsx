import { useNavigate } from 'react-router-dom'
import styles from './PatientCard.module.css'

const formatMetric = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  return value
}

const METRICS = [
  { key: 'heart_rate', label: 'Heart Rate', unit: 'bpm' },
  { key: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg' },
  { key: 'z_accel', label: 'Z Accel', unit: 'm/s²' },
]

const getMetricValue = (patient, key) => {
  if (key === 'blood_pressure') {
    const sys = formatMetric(patient.sys_blood_pressure)
    const dia = formatMetric(patient.dia_blood_pressure)
    if (sys === '—' && dia === '—') return '—'
    return `${sys} / ${dia}`
  }
  return formatMetric(patient[key])
}

const PatientCard = ({ patient }) => {
  const navigate = useNavigate()

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/patients/${patient.patient_id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate(`/patients/${patient.patient_id}`)
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.name}>
          {patient.firstname} {patient.lastname}
        </div>
        <div className={styles.sex}>{patient.sex || '—'}</div>
      </div>

      <div className={styles.measurements}>
        {METRICS.map(({ key, label, unit }) => (
          <div key={key} className={styles.metric}>
            <span className={styles.metricLabel}>{label}</span>
            <span className={styles.metricValue}>
              {getMetricValue(patient, key)} {getMetricValue(patient, key) !== '—' ? unit : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientCard
