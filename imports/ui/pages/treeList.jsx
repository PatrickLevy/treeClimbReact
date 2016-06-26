import React from 'react';
import { Link } from 'react-router';

export const TreeList = () =>
    <div>
        <Link to="/findTrees/" activeClassName="active">Switch to map view</Link>
        <h5>List of trees...</h5>
        <div>Sorry, this page is not finished yet.  Check back soon!</div>
    </div>;




