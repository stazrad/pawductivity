// packages
import React from 'react'
import { View } from 'react-native'

// imports
import Goals from './Goals'
import TimeSlider from './TimeSlider'

export default class StartScreen extends React.Component {
    constructor () {
        super()

        this.state = {
            goal: ''
        }
    }

    onSetGoal = goal => {
        this.setState({goal})
    }

    onSetTimer = timerConfig => {
        const timer = {
            ...timerConfig,
            ...this.state
        }
        this.props.onSetTimer(timer)
    }

    render () {
        return ([
            <Goals key='0' onSetGoal={this.onSetGoal} />,
            <TimeSlider key='1' onSetTimer={this.onSetTimer} />,
        ])
    }
}
