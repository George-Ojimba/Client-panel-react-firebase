import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";

import Spinner from "../layout/Spinner";
import profile from "./img/user.jpg";

class ClientDetail extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  //===> Update Client Balance <====
  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    //new balance to be updated
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    //Update in firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);

    //clear input
    this.setState({ balanceUpdateAmount: "" });
  };

  //===> Delete client <====
  onDeleteClick = () => {
    const { firestore, client, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  //===> onChange event <====
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    //if balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              className="form-control"
              onChange={this.onChange}
              value={balanceUpdateAmount}
              required
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark form-control"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div className="client-details">
          <div className="row my-4">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>

            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="profile">
              <img src={profile} alt="profile" />
            </div>
            <div className="card-header text-center">
              <h3>
                {client.firstName} {client.lastName}{" "}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h5>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h5>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h5 className="pull-right head-font">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance == 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() => {
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          });
                        }}
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h5>
                  {balanceForm}
                </div>
              </div>

              <ul className="list-group my-3">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetail.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetail);

//collection holds all clients but we want to store all clients as something else so that we can render it content,that is why we used storeAs to create an alias 
//for clients,the doc is used to get the information we need from the client which is this case is the id of the client to be rendered
