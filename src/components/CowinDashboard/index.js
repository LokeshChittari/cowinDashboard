// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    dashboardStats: {},
  }

  componentDidMount() {
    this.getDashboardStats()
  }

  getDashboardStats = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(
          vaccinationData => ({
            vaccineDate: vaccinationData.vaccine_date,
            dose1: vaccinationData.dose_1,
            dose2: vaccinationData.dose_2,
          }),
        ),
        vaccinationByAge: data.vaccination_by_age.map(vaccinationByAgeData => ({
          age: vaccinationByAgeData.age,
          count: vaccinationByAgeData.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(
          vaccinationByGenderData => ({
            count: vaccinationByGenderData.count,
            gender: vaccinationByGenderData.gender,
          }),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        dashboardStats: {...updatedData},
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="response-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-view" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {dashboardStats} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = dashboardStats
    return (
      <div className="charts-container">
        <VaccinationCoverage last7DaysVaccinationData={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGenderData={vaccinationByGender} />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAge} />
      </div>
    )
  }

  renderStats = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="dashboard-stats-container">
          <div className="logo-section">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="website-name">Co-WIN</h1>
          </div>
          <h1 className="dashboard-page-heading">CoWIN Vaccination in India</h1>
          {this.renderStats()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
