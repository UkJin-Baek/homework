import React, { Component } from 'react';
import 'src/App.css';
import PropTypes from 'prop-types';

class MyComponent extends Component {
    render(){
    const { name, children, age } = this.props
    return (
        <div>
            <br/>
            Name: {name}
            <br/>
            Children: {children}
            <br/>
            age: {age}
        </div>
        )
    }
}

MyComponent.defaultProps = {
    name: '국잔',
    age: 25
}

MyComponent.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired
}

export default MyComponent