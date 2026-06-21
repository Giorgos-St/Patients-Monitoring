import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import patientPageDemo from '../../assets/dev/patientPageDemo.json'
import BloodPressureChart from '../../components/BloodPressureChart/BloodPressureChart'
import Loader from '../../components/loader/Loader'
import MetricCard from '../../components/MetricCard/MetricCard'
import PatientDetailsCard from '../../components/PatientDetailsCard/PatientDetailsCard'
import { getPatientDetails } from '../../api/secure/patient'
import styles from './PatientPage.module.css'

const displayValue = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  return value
}

const PatientPage = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const { latestMeasurements, patientDetails, bloodPressureChart } = patientPageDemo

  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true)

      try {
        await getPatientDetails({ patientId })
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [patientId])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={() => navigate('/patients')}>
          Back
        </button>
      </div>

      <div className={styles.cards}>
        <MetricCard
          title="Heart Rate"
          unit="bpm"
          value={displayValue(latestMeasurements.heart_rate)}
          variant="blue"
        />
        <MetricCard
          title="SYS Blood Pressure"
          unit="mmHg"
          value={displayValue(latestMeasurements.sys_blood_pressure)}
          variant="blue"
        />
        <MetricCard
          title="DIA Blood Pressure"
          unit="mmHg"
          value={displayValue(latestMeasurements.dia_blood_pressure)}
          variant="red"
        />
        <PatientDetailsCard
          firstname={patientDetails.firstname}
          lastname={patientDetails.lastname}
        />
      </div>

      <BloodPressureChart data={bloodPressureChart} />
    </div>
  )
}

export default PatientPage
