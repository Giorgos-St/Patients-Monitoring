import { useMemo } from 'react'
import SecureRootLayout from '../layouts/secure/SecureRootLayout'
import PatientsPage from '../pages/PatientsPage/PatientsPage'
import PatientPage from '../pages/PatientPage/PatientPage'
import AddPatientPage from '../pages/AddPatientPage/AddPatientPage'
import { Navigate } from 'react-router-dom'

export const useSecureRoutes = () => {
  return useMemo(
    () => [
      {
        path: '/',
        element: <SecureRootLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/patients" replace />,
          },
          {
            path: '/patients',
            element: <PatientsPage />,
          },
          {
            path: '/patients/add',
            element: <AddPatientPage />,
          },
          {
            path: '/patients/:patientId',
            element: <PatientPage />,
          },
        ],
      },
    ],
    [],
  )
}
