// packages
import React from 'react'
import { View } from 'react-native'

// imports
import GoalInput from '../GoalInput'
import ImageContainer from '../ImageContainer'
import TimeSlider from '../TimeSlider'

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
            <ImageContainer key='0' source={require('../../images/pet/dog/ready-1.png')} />,
            <GoalInput key='1' onSetGoal={this.onSetGoal} />,
            <TimeSlider key='2' onTimerStart={this.onTimerStart} />,
        ])
    }
}
