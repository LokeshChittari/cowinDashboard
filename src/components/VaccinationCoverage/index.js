// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const DataFormatter = number => {
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props

  return (
    <div className="vaccination-coverage-chart">
      <h1 className="chart-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart data={last7DaysVaccinationData}>
          <XAxis dataKey="vaccineDate" />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <YAxis tickFormatter={DataFormatter} />
          <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
