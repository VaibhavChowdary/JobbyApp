import {Component} from 'react'
import Header from '../Header/Header'
import './Home.css'

class Home extends Component {
  findJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page">
          <div className="home-info-container">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and your
              potential.
            </p>
            <button
              type="button"
              className="home-button"
              onClick={this.findJobs}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
