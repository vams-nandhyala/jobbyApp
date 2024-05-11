import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'
const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-main-container">
      <div className="nav-container">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-bar-mobile-icons-container">
            <Link to="/">
              <li>
                <AiFillHome className="nav-item-mobile-link" />
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <BsFillBriefcaseFill className="nav-item-mobile-link" />
              </li>
            </Link>
            <li>
              <button
                className="logout-btn-mobile"
                onClick={onClickLogout}
                type="button"
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-conntainer-for-large">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-large"
            />
          </Link>

          <ul className="nav-manu">
            <Link to="/">
              <li>
                <h1 className="nav-home">Home</h1>
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <h1 className="nav-home">Jobs</h1>
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
