// packages
import React from 'react'
import { View } from 'react-native'

// imports
import Goals from './Goals'
import TimeSlider from './TimeSlider'

export default class StartScreen extends React.Component {
    render () {
        return ([
            <TimeSlider key='0' onSetTimer={this.props.onSetTimer} />,
            <Goals key='1' />,
        ])
    }
}
