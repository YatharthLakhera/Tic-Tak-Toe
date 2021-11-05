import React from "react";

export default class Reset extends React.Component {

    render() {
        return (
            <div style={{padding: '10px'}}>
                <button className='btn' onClick={() => this.props.onClick()}>Reset</button>
            </div>
        );
    }
}