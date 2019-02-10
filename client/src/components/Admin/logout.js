import React, { Component } from 'react';
import { logout } from '../../actions'
import { connect } from 'react-redux';

class Logout extends Component {

    componentWillMount() {
        this.props.dispatch(logout());
        setTimeout(() => {
            this.props.history.push('/')
        }, 2000)
    }

    render() {
        return (
            <div className="logout_container">
                <h1>Sorry to see you go :( :(</h1>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        logout: state.logout
    }
}

export default connect(mapStateToProps)(Logout);