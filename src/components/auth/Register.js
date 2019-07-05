import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { firebase, notifyUser } = this.props;

    //Register with firebase
    firebase.createUser({email,password}).catch(err => notifyUser('That User Already Exist', 'error'))
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className="row login">
        <div className="col-md-6 mx-auto">
          <div className="card px-3 py-3">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email" />
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    onChange={this.onChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={this.onChange}
                    value={password}
                  />
                </div>
                <div className="login-btn ">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);
