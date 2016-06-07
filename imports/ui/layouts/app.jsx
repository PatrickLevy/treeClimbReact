import React from 'react';
import  Navigation  from '../components/navigation.jsx';


//note:  because this is stateless function, we get the props automatically as arguments
export const App = ( { children } ) => (
    <div>
        <Navigation />
        { children }
    </div>
)