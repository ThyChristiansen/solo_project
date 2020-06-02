import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '../Box/Box';
import './BoxList.css'
import { Link } from 'react-router-dom';
import SearchingBar from '../SearchBar/SearchBar';


class BoxList extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_BOX' })
        //Send the FETCH_BOX action to Saga via dispatch to get box'list
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_BOX',
            payload: {
                roomId: match.params.id,
            }
        });
        //Send the FETCH_ROOM_NAME action to Saga via dispatch to get room's name
        dispatch({
            type: 'FETCH_ROOM_NAME',
            payload: {
                roomId: match.params.id,
            }
        })
        dispatch({
            type: 'FETCH_ALL_BOX',
            payload: {
                roomId: match.params.id,
            }
        })
    }
    //handle click for add new box button. 
    //When the user click on this button, this handle function will send the ADD_BOX action
    // to Saga and performing add new box into the boxes table in database
    //I also send the roomId in payload so that the user can add boxes to different room.
    handleOnClickAddNewBox = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_BOX',
            payload: {
                roomId: match.params.id
            }
        })

    }
    //if that room is have no box, this function will send the ADD_FIRST_BOX to Saga 
    //to start the first box with its name is 1  
    handleOnClickAddFirsBox = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');

        dispatch({
            type: 'ADD_FIRST_BOX',
            payload: {
                roomId: match.params.id
            }
        })

    }
    handleOnClickAddFirstBoxInRoom = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');

        dispatch({
            type: 'ADD_FIRST_BOX_IN_ROOM',
            payload: {
                roomId: match.params.id
            }
        })

    }
    //handle back to home button
    handleBackToRoomList = () => {
        console.log('BacktoRoomList clicked');
        this.props.history.push('/home');
    }

    render() {

        // Create the conditional for add new box, if the all of the room list is empty,
        // sending the ADD_FIRST_BOX action to server to create the first box have id = 1 
        // box_name = 1, qr_code = 1.
        // If inside a specific room is empty, 
        // sending the ADD_FIRST_BOX_IN_ROOM action to server to create the first box have id = increment number from the previous id,
        // box_name = 1, qr_code = 1.
        // if box list had a couple boxes, sending the ADD_BOX action to server to keep on 
        //increment number of id, box's name, qr_code, from the last row
        let addNewBox;
        if (this.props.reduxState.allBox.length === 0) {
            addNewBox = <button onClick={this.handleOnClickAddFirstBox}
                className="add_new_box_btn">Add new box</button>
        } else if (this.props.reduxState.boxes.length === 0) {
            addNewBox = <button onClick={this.handleOnClickAddFirstBoxInRoom}
                className="add_new_box_btn">Add new box</button>
        }else {
            addNewBox = <button onClick={this.handleOnClickAddNewBox}
                className="add_new_box_btn">Add new box</button>
        }

        return (
            <div>
                <SearchingBar />

                <button onClick={this.handleBackToRoomList}>Back to room list</button>

                {/* Display room's name ‰
                Maping through the roomName array from reducer then return the room's name  */}
                {this.props.reduxState.roomName.map((room, index) => {
                    // if (index === 0) {
                    //     return (
                    //         <h1 className="box_list_header"
                    //             onClick={this.handleBackToRoomList}
                    //         >{room.room_name}</h1>
                    //     )
                    // }
                    return (<h1 className="box_list_header"
                        onClick={this.handleBackToRoomList}
                    >{room.room_name} </h1>)
                })}

                {/* Display box quantity in the room */}
                <p className="box_list_header">Box quantity: {this.props.reduxState.boxes.length}</p>

                {addNewBox}

                {/* Mapping through tr boxes array that got from reducer and display boxes */}
                {this.props.reduxState.boxes.map((box) => {
                    return (
                        <div key={box.id} className="box_item">
                            <Box
                                box={box}
                            />
                        </div>
                    )
                })}
                {/* <h1>{JSON.stringify(this.props.reduxState.boxes)}</h1> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxList);