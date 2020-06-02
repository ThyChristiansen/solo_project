import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode';
import Item from '../Item/Item';
import './BoxDetail.css';
import SearchingBar from '../SearchBar/SearchBar';


class BoxDetail extends Component {

    // create state to store the item data
    state = {
        item: ''
    }

    componentDidMount() {
        //Get box's data after refresh page by id
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_DETAIL',
            payload: {
                id: match.params.id,
                roomId: match.params.roomId,
            }
        });
        //send FETCH_ITEMS action to Saga to get items of the box that user choosed
        dispatch({
            type: 'FETCH_ITEMS',
            payload: {
                id: match.params.id,
                roomId: match.params.roomId,
            }
        });
        console.log('--------->this is box id:', match.params.id)
        console.log('--------->this is room id:', match.params.roomId)
    }

    //handle come back list box page
    backClick = () => {
        const { match } = this.props;
        console.log('back clicked');
        this.props.history.push(`/boxes/${match.params.roomId}`)
    }

    //handle changing for add new item input field
    handleInputChangeFor = (event) => {
        // console.log('changing', event.target.value)
        this.setState({
            item: event.target.value,
        });
    }
    //handle add item and clear input field after clicked add button
    handleSubmit = () => {
        if (this.state.item === '') {
            alert('Add items to your list before click button')
        } else {
            this.handleAddNewItem();
            this.handleClearInput();
        }
    }

    handleClearInput = () => {
        this.setState({
            item: '',
        });
    }

    //handle add new item button
    handleAddNewItem = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                item: this.state.item,
                id: match.params.id,
                roomId: match.params.roomId,
            }
        })
    }
    //Create this function to send the roomId to item component to can delete the item inside the chosen box and room
    sendRoomIdToItem = (roomId) => {
        const { match } = this.props;
        return match.params.roomId
    }
    //handle delete box
    handleDeleteBox = () => {
        console.log('delete clicked');
        const { dispatch, match } = this.props;
        dispatch({
            type: 'DELETE_BOX',
            payload: {
                boxId: match.params.id,
                roomId: match.params.roomId,
            }
        })
        console.log('------->box id',match.params.id );
        //Bringing the user back to the box list after click on delete button
        this.props.history.push(`/boxes/${match.params.roomId}`)
    }


    render() {
        return (
            <div className="box_detail">
                <SearchingBar />

                <button onClick={this.backClick}
                    className="back_btn">Back to box list</button>
                {/* mapping through the box list array to get room_id from database to display in DOM */}
                {/* box's name condition for each room */}
                {this.props.reduxState.detail.map((box) => {
                    let boxName;
                    if (box.room_name === 'Storage') {
                        boxName = <div key={box.id}>
                            <h1>Storage</h1>
                            <p className="box_name">A{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>

                    } else if (box.room_name === 'Basement') {
                        boxName = <div key={box.id}>
                            <h1>Basement</h1>
                            <p className="box_name">B{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    }
                    else if (box.room_name === 'Garage') {
                        boxName = <div key={box.id}>
                            <h1>Garage</h1>
                            <p className="box_name">C{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    }
                    else if (box.room_name === 'Livingroom') {
                        boxName = <div key={box.id}>
                            <h1>Livingroom</h1>
                            <p className="box_name">D{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    }
                    else if (box.room_name === 'Bedroom') {
                        boxName = <div key={box.id}>
                            <h1>Bedroom</h1>
                            <p className="box_name">E{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    }
                    else if (box.room_name === 'Kitchen') {
                        boxName = <div key={box.id}>
                            <h1>Kitchen</h1>
                            <p className="box_name">F{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    }
                    return (
                        boxName
                    )
                })}

                {/* add new item field */}
                <p>Add item to your box:</p>
                <input
                    type="text"
                    placeholder='Add item...'
                    value={this.state.item}
                    onChange={this.handleInputChangeFor}
                    width="80%"
                />
                <button onClick={this.handleSubmit}>Add</button>

                <div className="list_item" >
                    {/* Mapping through the item array to display list item in DOM */}
                    {this.props.reduxState.item.map((item) => {
                        return (
                            <div key={item.id}
                                className="item"
                            >
                                <Item item={item}
                                    boxId={item.box_id}
                                    roomId={this.sendRoomIdToItem}
                                />
                            </div>
                        )
                    })}
                    {/* <h1>{JSON.stringify(this.props.reduxState.detail)}</h1> */}
                </div>
                <button onClick={this.handleDeleteBox}>Delete</button>

            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxDetail);