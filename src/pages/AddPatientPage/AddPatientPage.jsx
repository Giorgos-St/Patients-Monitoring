import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { createPatient, getFacilities } from '../../api/secure/patient'
import styles from './AddPatientPage.module.css'

const normalizeFacilities = (data) => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.facilities)) return data.facilities
  return []
}

const getApiErrorMessage = (err) => {
  const data = err?.response?.data
  if (typeof data === 'string') return data
  if (data?.message) return data.message
  if (data?.error) return data.error
  if (err?.response?.status === 401) return 'Not authorized. Please log in again.'
  if (err?.response?.status === 405) return 'Request method not allowed. Use HTTPS for POST requests.'
  return 'Failed to add patient. Please check the form and try again.'
}

const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }

  return age
}

const initialForm = {
  firstname: '',
  lastname: '',
  email: '',
  facility_id: '',
  address_street: '',
  address_number: '',
  address_city: '',
  address_postalcode: '',
  birth_date: '',
  sex: '',
  amka: '',
  phonenumber: '',
}

const AddPatientPage = () => {
  const navigate = useNavigate()
  const [facilities, setFacilities] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getFacilities()
        const list = normalizeFacilities(data)
        setFacilities(list)
        if (list.length === 0) {
          setError('No facilities available. You may not be able to add a patient.')
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load facilities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacilities()
  }, [])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setError('')

    const facilityId = Number(form.facility_id)
    const age = calculateAge(form.birth_date)

    if (!form.facility_id || Number.isNaN(facilityId) || facilityId <= 0) {
      setError('Please select a facility.')
      return
    }

    if (!form.birth_date || Number.isNaN(age) || age < 0) {
      setError('Please enter a valid birth date.')
      return
    }

    if (!form.sex) {
      setError('Please select sex.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await createPatient({
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
        facility_id: facilityId,
        address_street: form.address_street.trim(),
        address_number: form.address_number.trim(),
        address_city: form.address_city.trim(),
        address_postalcode: form.address_postalcode.trim(),
        phonenumber: form.phonenumber.trim(),
        sex: form.sex,
        age,
        amka: form.amka.trim(),
        ext_patient: true,
      })
      console.log(res)

      // navigate('/patients')
    } catch (err) {
      console.error(err?.response?.data ?? err)
      setError(getApiErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backButton}
        //  onClick={() => navigate('/patients')}
        >
          Back
        </button>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formHeader}>Personal Details</div>

        <form className={styles.formBody}
          onSubmit={handleSubmit}
          noValidate>

          <div className={styles.row}>
            <label className={styles.field}>
              <div className={styles.label}>First Name *</div>
              <input
                type="text"
                value={form.firstname}
                onChange={handleChange('firstname')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Last Name *</div>
              <input
                type="text"
                value={form.lastname}
                onChange={handleChange('lastname')}
                required
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <div className={styles.label}>Email *</div>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Facility Name *</div>
              <select
                className={styles.select}
                value={form.facility_id}
                onChange={handleChange('facility_id')}
                required
              >
                <option value="">Select facility</option>
                {facilities.map((facility) => (
                  <option key={facility.facility_id} value={facility.facility_id}>
                    {facility.facility_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={`${styles.row} ${styles.rowFour}`}>
            <label className={styles.field}>
              <div className={styles.label}>Street *</div>
              <input
                type="text"
                value={form.address_street}
                onChange={handleChange('address_street')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Number *</div>
              <input
                type="text"
                value={form.address_number}
                onChange={handleChange('address_number')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>City *</div>
              <input
                type="text"
                value={form.address_city}
                onChange={handleChange('address_city')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Postal Code *</div>
              <input
                type="text"
                value={form.address_postalcode}
                onChange={handleChange('address_postalcode')}
                required
              />
            </label>
          </div>

          <div className={`${styles.row} ${styles.rowFour}`}>
            <label className={styles.field}>
              <div className={styles.label}>Birth Date *</div>
              <input
                type="date"
                value={form.birth_date}
                onChange={handleChange('birth_date')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Sex *</div>
              <select
                className={styles.select}
                value={form.sex}
                onChange={handleChange('sex')}
                required
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Social Security Number *</div>
              <input
                type="text"
                value={form.amka}
                onChange={handleChange('amka')}
                required
              />
            </label>
            <label className={styles.field}>
              <div className={styles.label}>Phone</div>
              <input
                type="text"
                value={form.phonenumber}
                onChange={handleChange('phonenumber')}
                placeholder="+306912345678"
              />
            </label>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Details'}
            </button>
          </div>

          <div className={styles.note}>Every field with * is required</div>
        </form>
      </div>
    </div>
  )
}

export default AddPatientPage
