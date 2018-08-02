// packages
import React from 'react'
import {
    AppState,
    DeviceEventEmitter,
    NativeEventEmitter,
    PushNotificationIOS,
    Text
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import LockState from 'react-native-lockstate'

// imports
import theme from '../../theme'

let started = false
let timeOfInactive
let timeOfBackground

export default class Timer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            startTime: props.timer.startTime,
            started: false,
            leftAppAt: null,
            phoneLocked: false,
            minutes: props.timer.amount - 1,
            seconds: 59
        }
    }

    runTimer = () => {
        const { startTime } = this.state

        const logger = setInterval(() => {
            let minutes = this.state.minutes
            let seconds = this.state.seconds - 1

            if (seconds < 0) {
                seconds = 59
                minutes = minutes - 1
            }
            if (seconds < 10) {
                seconds = '0' + seconds
            }

            this.setState({minutes, seconds})

            if (minutes === 0 && seconds == 0) {
                clearInterval(logger)
                this.props.onTimerEnd('success')
            }
        }, 1000)

        started = true
    }

    sendPushNotification = body => {
        // https://facebook.github.io/react-native/docs/pushnotificationios.html
        const details = {
            alertBody: body || 'Don\'t get distracted! Hurry back to continue being pawductive!'
        }

        PushNotificationIOS.presentLocalNotification(details)
    }

    handleAppStateChange = (appState, locked) => {
        if (appState === 'inactive') {
            timeOfInactive = new Date()
        } else if (appState === 'background') {
            timeOfBackground = new Date()
            const timeDifference = Math.abs(timeOfInactive - timeOfBackground)
            console.log(timeDifference)

            if (timeDifference < 100) {
                // reasonably believe this is a phone lock
                this.sendPushNotification('Probably a lock screen?')
            } else {
                // reasonably belive this is a home button
                this.sendPushNotification('Did you push the home button?')
            }
            this.setState({ leftAppAt: timeOfBackground })
        }
        if (appState === 'active') {
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                this.props.onTimerEnd('fail')
            }
        }
    }

    handleLockStateChange = ({ lockState }) => {
        // const locked = lockState === 'locked'
        //
        // if (locked) this.sendPushNotification('PHONE LOCKED')
        // this.setState({ locked })
    }

    componentDidMount () {
        this.runTimer()
        AppState.addEventListener('change', this.handleAppStateChange)
        LockState.addEventListener('change', this.handleLockStateChange)
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange)
        LockState.removeEventListener('change', this.handleLockStateChange)
    }

    render () {
        const { minutes, seconds } = this.state
        const { amount } = this.props.timer

        return ([
            // <Text key='0'>...just {amount} minutes!</Text>,
            <Text key='1' style={styles.numbers}>{minutes}:{seconds}</Text>
        ])
    }
}

const styles = {
    numbers: {
        fontSize: 40,
        color: theme.black,
        marginBottom: 20,
        fontWeight: 'bold',
    }
}
