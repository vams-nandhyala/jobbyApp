import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProfileDetails extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileDetailsView = () => {
    const {profileData} = this.state
    const {name, profileImgUrl, shortBio} = profileData
    return (
      <div className="profile-details-container">
        <img src={profileImgUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="user-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => {
    ;<div className="profile-failure-view-container">
      <buuton
        type="button"
        id="button"
        onClick={this.getProfileData()}
        className="btn-failure"
      >
        Retry
      </buuton>
    </div>
  }
  renderLoadingView = () => (
    <div className="profile-loader-container " id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default ProfileDetails
