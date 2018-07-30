// packages
import React from 'react'
import {
    AsyncStorage,
    Button,
    Image,
    PushNotificationIOS,
    StyleSheet,
    View
} from 'react-native'
import PushNotification from 'react-native-push-notification'

// imports
import GoalInput from '../GoalInput'
import ImageContainer from '../ImageContainer'
import TimeSlider from '../TimeSlider'
import theme from '../../theme'

export default class TimerScreen extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            goal: '',
            outcome: props.outcome || 'success'
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

    getSource = outcome => {
        switch(outcome) {
            case 'success':
                return require('../../images/pet/dog/success-1.png')
            case 'fail':
                return require('../../images/pet/dog/fail-1.png')
            default:
                return require('../../images/pet/dog/success-1.png')
        }
    }

    componentDidMount () {
        if (this.state.outcome === 'success') {
            this.props.setStoredTotalMinutes()
        }
        // remove all delivered push notifications
        PushNotificationIOS.getDeliveredNotifications(notifications => {
            const identifiers = notifications.map(n => n.identifier)
            PushNotificationIOS.removeDeliveredNotifications(identifiers)
        })
    }

    render () {
        const { outcome } = this.state

        return ([
            <ImageContainer key='0' source={this.getSource(outcome)} />,
            <GoalInput key='1' onSetGoal={this.onSetGoal} />,
            <TimeSlider
                key='2'
                buttonText={outcome === 'success' ? 'LET\'S GO AGAIN' : 'TRY AGAIN'}
                onTimerStart={this.onTimerStart} />
        ])
    }
}
