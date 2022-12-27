// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props

  const getColorCode = age => {
    if (age === '18-44') {
      return '#2d87bb'
    }
    if (age === '44-60') {
      return '#a3df9f'
    }
    return '#64c2a6'
  }

  return (
    <div className="vaccination-by-age-chart">
      <h1 className="chart-heading">Vaccination by Age</h1>
      <ResponsiveContainer width="90%" height={300}>
        <PieChart>
          <Pie
            data={vaccinationByAgeData}
            startAngle={0}
            endAngle={360}
            dataKey="count"
          >
            {vaccinationByAgeData.map(eachAge => (
              <Cell
                key={eachAge.age}
                name={eachAge.age}
                fill={getColorCode(eachAge.age)}
              />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
