import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PatientsPage.module.css'
import { getPatientMeasurements, getPatients } from '../../api/secure/patient'
import Loader from '../../components/loader/Loader'
import { useUser } from '../../context/userContext'
import PatientCard from '../../components/PatientCard/PatientCard'
import Pagination from '../../components/pagination/Pagination'

const PAGE_SIZE = 10

const normalizePatients = (data) => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.patients)) return data.patients
  return []
}

const hasListMeasurements = (patient) =>
  (patient.heart_rate != null && patient.heart_rate !== '') ||
  (patient.sys_blood_pressure != null && patient.sys_blood_pressure !== '') ||
  (patient.dia_blood_pressure != null && patient.dia_blood_pressure !== '') ||
  (patient.z_accel != null && patient.z_accel !== '')

const enrichWithMeasurements = async (list) =>
  Promise.all(
    list.map(async (patient) => {
      if (hasListMeasurements(patient)) return patient

      try {
        const measurements = await getPatientMeasurements({
          patientId: patient.patient_id,
        })
        const latest = Array.isArray(measurements) ? measurements[0] : null
        return latest ? { ...patient, ...latest } : patient
      } catch (error) {
        console.error(error)
        return patient
      }
    }),
  )

const PatientsPage = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const [patients, setPatients] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [rows, setRows] = useState([])

  const onPageChange = (page) => {
    setCurrentPage(page)
    setRows(patients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
  }

  useEffect(() => {
    if (!user?.user_id) return

    const fetchPatients = async () => {
      setPatients(null)

      try {
        const data = await getPatients({ userId: user.user_id })
        const list = await enrichWithMeasurements(normalizePatients(data))
        setPatients(list)
        setCurrentPage(1)
        setRows(list.slice(0, PAGE_SIZE))
        setTotalPages(Math.max(1, Math.ceil(list.length / PAGE_SIZE)))
      } catch (error) {
        console.error(error)
        setPatients([])
        setRows([])
      }
    }

    fetchPatients()
  }, [user?.user_id, location.key])

  if (patients === null) {
    return <Loader />
  }

  return (
    <div className={styles.patientsPage}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => navigate('/patients/add')}
        >
          Add Patient
        </button>
      </div>

      <div className={styles.patientsList}>
        {rows.map((patient) => (
          <PatientCard key={patient.patient_id} patient={patient} />
        ))}
      </div>

      <div className={styles.paginationWrap}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default PatientsPage
