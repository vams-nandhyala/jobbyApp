import './index.css'

const NotFound = () => (
  <div className="main-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="failure-view-img"
      alt="not found"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="para">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
