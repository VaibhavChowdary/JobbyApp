import {Component} from 'react'
import Cookie from 'js-cookie'
import './Profile.css'

class Profile extends Component {
  state = {
    profileImageUrl: '',
    name: '',
    shortBio: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookie.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const profileData = await response.json()
    const data = profileData.profile_details
    this.setState({
      profileImageUrl: data.profile_image_url,
      name: data.name,
      shortBio: data.short_bio,
    })
  }

  render() {
    const {profileImageUrl, name, shortBio} = this.state
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }
}

export default Profile
