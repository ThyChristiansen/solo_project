import React, { Component } from 'react';
import { connect } from 'react-redux';


class SearchingBar extends Component {
    state = {
        searchItem: ''
    }

    handleChangeFor = (event) => {
        this.setState({
            searchItem: event.target.value
        });// end setState   
        this.props.dispatch({
            type: 'SEARCH_ITEM',
            payload: {
                searchItem: this.state.searchItem,
            }
        })
    }

    render() {
        let resultSearching;
        if (this.state.searchItem.length === 0) {
            resultSearching = <p></p>
        } else if (this.props.reduxState.searchItem.length === 0) {
            resultSearching = <p>Result searching is empty</p>
        }
        else if(this.props.reduxState.searchItem.length !== 0) {
            resultSearching=  this.props.reduxState.searchItem.map((item) => {
                return (
                    <div key={item.id}>
                        <span>{item.room_name}</span><span>Box {item.box_name}</span>
                    </div>
                )
            })
        }


        return (
            <div>
                <input
                    type="text"
                    placeholder="Find item..."
                    value={this.state.searchItem}
                    onChange={this.handleChangeFor}
                />
                <p>{resultSearching}</p>
               
                {/* <h1>{JSON.stringify(this.props.reduxState.searchItem.length)}</h1> */}

            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(SearchingBar);