import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobCard from '../JobCard'

import FiltersSection from '../FiltersSection'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employeeType: [],
    minimumSalary: 0,
  }
  componentDidMount() {
    this.getJobsData()
  }
  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {employeeType, minimumSalary, searchInput} = this.state
    const jwtToken = Cookies.get('jwttoken')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobLIstView = () => {
    const {jobsList} = this.state
    const isjobsFined = jobsList.length > 0
    return isjobsFined ? (
      <div className="jobs-details-container">
        <ul className="jobs-unorder-list">
          {jobsList.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-view"
        />
        <h1 className="failure-msg">Oops! Something Went Wrong</h1>
        <p className="para">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn">Retry</button>
      </div>
    )
  }

  renderInProgressView = () => {
    ;<div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobLIstView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }
  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }
  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobsData)
  }

  changeEmployeeList = type => {
    this.setState(
      prev => ({employeeType: [...prev.employeeType, type]}),
      this.getJobsData,
    )
  }
  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-sub-container">
            <ProfileDetails />
            <hr className="underline" />
            <FiltersSection
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobsData={this.getJobsData}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
            />
          </div>
          <div className="jobs-sub-search-and-job-list-container">
            <div className="jobs-list-search-container">
              <input
                type="search"
                placeholder="Search"
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterSearchInput}
                className="search-input"
              />
              <button
                className="btn-search"
                type="button"
                data-testid="searchButton"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon-desktop" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
