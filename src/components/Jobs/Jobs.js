import Cookie from 'js-cookie'
import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import './Jobs.css'

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRangeRequired: undefined,
    searchValue: undefined,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  componentDidUpdate(prevProps, prevState) {
    const {employmentType, salaryRangeRequired, searchValue} = this.state
    if (
      prevState.employmentType.length !== employmentType.length ||
      prevState.salaryRangeRequired !== salaryRangeRequired ||
      prevState.searchValue !== searchValue
    ) {
      this.getJobsList()
    }
  }

  getJobsList = async () => {
    const {employmentType, salaryRangeRequired, searchValue} = this.state
    let filtered = false
    let url = 'https://apis.ccbp.in/jobs'
    if (employmentType.length !== 0) {
      url += `?employment_type=${employmentType.join()}`
      filtered = true
    }
    if (salaryRangeRequired !== undefined) {
      url += filtered ? '&' : '?'
      url += `minimum_package=${salaryRangeRequired}`
      filtered = true
    }
    if (searchValue !== undefined) {
      url += filtered ? '&' : '?'
      url += `search=${searchValue}`
      filtered = true
    }
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
    this.setState({jobsList})
  }

  checkChanged = event => {
    if (event.target.checked) {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, event.target.id],
      }))
    } else {
      this.setState(prevState => ({
        employmentType: prevState.employmentType.filter(
          eachItem => eachItem !== event.target.id,
        ),
      }))
    }
  }

  radioChanged = event => {
    this.setState({salaryRangeRequired: event.target.id})
  }

  searched = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobsList} = this.state

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
            <div className="jobs-container">
              {jobsList.map(eachItem => (
                <div className="job-container">
                  <div className="job-heading-container">
                    <img
                      src={eachItem.companyLogoUrl}
                      alt="job-company-logo"
                      className="job-company-logo"
                    />
                    <div className="job-title-container">
                      <h1 className="job-title">{eachItem.title}</h1>
                      <div className="job-rating-container">
                        <AiTwotoneStar className="job-rating-icon" />
                        <p className="job-rating">{eachItem.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-details-container">
                    <div className="job-location-type-container">
                      <MdLocationOn className="job-details-icon" />
                      <p className="job-details">{eachItem.location}</p>
                      <BsFillBriefcaseFill className="job-details-icon job-type-icon" />
                      <p className="job-details">{eachItem.employmentType}</p>
                    </div>
                    <p className="package">{eachItem.packagePerAnnum}</p>
                  </div>
                  <hr className="job-container-line" />
                  <h1 className="job-description-heading">Description</h1>
                  <p className="job-description">{eachItem.jobDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
