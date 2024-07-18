import { useNavigate, Outlet, NavLink } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="new-flex-container">
        <div className="profile-container">
          <div className="profile-nav">
            <div className="profile-aside-header">
              <div className="close-panel">
                <div className="nav-icon" onClick={handleClick}>
                  <i className="fa fa-arrow-left"></i>
                  <span className="tooltip-text tooltip-top">Goto Home</span>
                </div>
              </div>
              <h1>Profile</h1>
            </div>
            <nav>
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink
                    to="bio"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <span> Bio </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="activity"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <span> Activity</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="keys"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <span>Keys</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="profile-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
