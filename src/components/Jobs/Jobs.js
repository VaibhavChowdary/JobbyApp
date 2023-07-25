import Cookie from 'js-cookie'
import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import './Jobs.css'

class Jobs extends Component {
  state = {
    employmentType: [],
  }

  getJobsList = async () => {
    const {employmentType, salaryRangeRequired, searchValue} = this.state
    const url = `https://apis.ccbp.in/jobs
    ?employment_type=${employmentType.join()}
    &minimum_package=${salaryRangeRequired}
    &search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookie.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {jobs} = data
    const jobsList = jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    console.log(jobsList)
  }

  checkChanged = event => {
    this.setState(prevState => ({
      employmentType: [event.target.id, ...prevState.employmentType],
    }))
  }

  radioChanged = event => {
    this.setState({salaryRangeRequired: event.target.id})
  }

  searched = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    this.getJobsList()
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="dashboard">
            <Profile />
            <hr className="dashboard-line" />
            <div>
              <h1 className="dashboard-filters-heading">Types of Employment</h1>
              <ul className="dashboard-filters-list">
                {employmentTypesList.map(employmentType => (
                  <li
                    className="dashboard-filters-list-item"
                    key={employmentType.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={employmentType.employmentTypeId}
                      onChange={this.checkChanged}
                    />
                    <label
                      htmlFor={employmentType.employmentTypeId}
                      className="dashboard-filters-label"
                    >
                      {employmentType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="dashboard-line" />
            <div>
              <h1 className="dashboard-filters-heading">Salary Range</h1>
              <ul className="dashboard-filters-list">
                {salaryRangesList.map(salaryRange => (
                  <li
                    className="dashboard-filters-list-item"
                    key={salaryRange.salaryRangeId}
                  >
                    <input
                      type="radio"
                      name="salaryRanges"
                      id={salaryRange.salaryRangeId}
                      onChange={this.radioChanged}
                    />
                    <label
                      htmlFor={salaryRange.salaryRangeId}
                      className="dashboard-filters-label"
                    >
                      {salaryRange.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-section">
            <div className="jobs-search-container">
              <input
                type="search"
                placeholder="Search"
                className="jobs-search-bar"
                onChange={this.searched}
              />
              <button type="button" className="jobs-search-button">
                <BiSearchAlt2 className="jobs-search-icon" />
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
