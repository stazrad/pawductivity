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

    onTimerStart = timerConfig => {
        const timer = {
            ...timerConfig,
            ...this.state
        }
        this.props.onTimerStart(timer)
    }

    render () {
        return ([
            <Goals key='0' onSetGoal={this.onSetGoal} />,
            <TimeSlider key='1' onTimerStart={this.onTimerStart} />,
        ])
    }
}
