import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'
const Home = () => (
  <>
    <Header />
    <div className="home-main-container">
      <div className="home-sub-container">
        <h1 className="find-jn-heading">Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs,salary information,company
          reviews.Findthe job that fits to your abilites and potential.
        </p>
        <Link to="/jobs">
          <button className="find-jon-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
