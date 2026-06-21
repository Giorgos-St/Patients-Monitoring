import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styles from './BloodPressureChart.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const formatTimeLabel = (timestamp) => {
  const timePart = timestamp?.split(' ')?.[1]
  if (!timePart) return timestamp
  return timePart.slice(0, 5)
}

const BloodPressureChart = ({ data, title = 'Blood Pressure ( SYS | DIA )' }) => {
  const chartData = {
    labels: data.map((entry) => formatTimeLabel(entry.timestamp)),
    datasets: [
      {
        label: 'Systolic Blood Pressure',
        data: data.map((entry) => entry.sys_blood_pressure),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Diastolic Blood Pressure',
        data: data.map((entry) => entry.dia_blood_pressure),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        color: '#08060d',
        font: { size: 14, weight: '600' },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 200,
        ticks: {
          stepSize: 20,
        },
        title: {
          display: true,
          text: 'mmHg',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  }

  return (
    <div className={styles.chartWrap}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default BloodPressureChart
