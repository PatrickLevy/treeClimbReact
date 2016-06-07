import React from 'react';

//to test the query params http://localhost:3000/hello/Pat?food=tacos
export const Hello = ( { params, location } ) => (
    <h3>Howdy, { params.name }! You like { location.query.food }.</h3>
);