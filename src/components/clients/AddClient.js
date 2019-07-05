import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import {firestoreConnect} from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newContact = this.state;

    //firestore, history are properties of firestore
    const {firestore, history } = this.props;

    //if the balance field is empty, make it '0'
    if(newContact.balance === ""){
      newContact.balance = 0;
    };

    //Add newContact to collection
    firestore.add({collection: 'clients'}, newContact).then(()=> history.push("/"));

    //clear states from form 
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      balance: ""
    });
  };

  onChange = (e) => this.setState({[e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link ">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h4>Add Client</h4></div>
          <div className="card-body">
            <form onSubmit = {this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  minLength="3"
                  required
                  onChange = {this.onChange}
                  value={this.state.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  minLength="3"
                  required
                  onChange = {this.onChange}
                  value={this.state.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange = {this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  minLength="10"
                  required
                  onChange = {this.onChange}
                  value={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  onChange = {this.onChange}
                  value={this.state.balance}
                />
              </div>

              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
