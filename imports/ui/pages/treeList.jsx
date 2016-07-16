import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TreeListComponent  from '/imports/ui/components/treeListComponent.jsx'
import TreeDetails from '/imports/ui/components/treeDetails.jsx'

export class TreeList extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedTree: ""};

        //Bind this context to the state updater function so that the parent's state is updated when called from the child
        this.handleSelectedTreeUpdate = this.handleSelectedTreeUpdate.bind(this);
    }

    handleSelectedTreeUpdate(selectedTree) {
        this.setState({
            selectedTree: selectedTree
        });
    }


    render() {
        return (
            <div>
                <Link to="/findTrees/" activeClassName="active">Switch to map view</Link>
                <div className="row">
                    <div className="col s4">
                        <TreeListComponent updateSelectedTree={this.handleSelectedTreeUpdate}/>
                    </div>

                    <div className="col s8">
                        <TreeDetails selectedTree={this.state.selectedTree}/>
                    </div>

                </div>
            </div>
        );
    }
}

