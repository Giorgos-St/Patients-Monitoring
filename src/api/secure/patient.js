import { apiCall, axios } from '..'

export const getPatients = async ({ userId }) => {
    return apiCall(() => axios.get('/patients', { params: { user_id: userId } }))
}

export const getPatientDetails = async ({ patientId }) => {
    return apiCall(() =>
        axios.get('/patients', {
            params: {
                patient_id: patientId,
                details: true,
            },
        }),
    )
}

export const getPatientMeasurements = async ({ patientId }) => {
    return apiCall(() =>
        axios.get('/realmeasurements', {
            params: {
                patient_id: patientId,
                detail: 'second',
                interval: '10 seconds',
                lastvalues: 1,
            },
        }),
    )
}

export const getFacilities = async () => {
    return apiCall(() => axios.get('/facilities'))
}

export const createPatient = async (patient) => {
    return apiCall(() => axios.post('/patients', patient))
}

