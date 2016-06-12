//import React from 'react';

import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Navigation extends Component {
    componentDidMount()
    {
        $(".button-collapse").sideNav();
    }

    render() {
        return (

            <nav>
                <div className="nav-wrapper green">
                    <a href="#" className="brand-logo">TreeMe</a>

                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                        <li><Link to="/findTrees" activeClassName="active">Find a Tree</Link></li>
                        <li><Link to="/addTree" activeClassName="active">Add a Tree</Link></li>
                        <li><Link to="/login" activeClassName="active">Login</Link></li>
                    </ul>

                    <ul className="side-nav" id="mobile-demo">
                        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                        <li><Link to="/findTrees" activeClassName="active">Find a Tree</Link></li>
                        <li><Link to="/addTree" activeClassName="active">Add a Tree</Link></li>
                        <li><Link to="/login" activeClassName="active">Login</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }

};