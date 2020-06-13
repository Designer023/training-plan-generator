import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {} from "react-router-dom";

import { authorize } from "../../redux/actions";

const Nav = ({ auth, actions }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Plan generator
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {/* <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/athlete">
                                    Athlete
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/stats">
                                    Stats
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/activities">
                                    Activities
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/graphs">
                                    Graphs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/plan">
                                    Plan
                                </Link>
                            </li>
                        </Fragment> */}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ authorize }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
