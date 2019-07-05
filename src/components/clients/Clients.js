import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  //It is used to update: if there is anything to update it returns an object and if there is nothing to update it return nul. It also updates everytime the page re-renders
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //Add balances
      const total = clients.reduce((accumulator, client) => {
        return accumulator + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    } else {
      return null;
    }
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2 className="client-heading">
                <i className="fas fa-users" /> Clients
              </h2>
            </div>

            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total owed:{" "}
                <span className="text-primary head-font">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          {/* TABLES  */}
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td className="head-font">
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance == 0 
                        //using strict equality causes a bug, bug is fixed by not using strict equality 
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    //Our collection in firestore db holds our clients(data) which is then passed to props and our component can have access to the data.
    clients: state.firestore.ordered.clients
  }))
)(Clients);
