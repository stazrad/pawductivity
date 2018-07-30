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

    handleAppStateChange = appState => {
        console.log(appState)
        if (typeof appState === 'object') {
            console.log('obj', appState)
            if (appState.lockState === 'locked') {
                console.log('locked')
                this.setState({ locked: true })
            } else {
                this.setState({ locked: false })
            }
            return
        }
        if (appState === 'background' && !this.state.locked) {
            // https://facebook.github.io/react-native/docs/pushnotificationios.html
            const details = {
                alertBody: 'Don\'t get distracted! Hurry back to continue being pawductive!'
            }

            PushNotificationIOS.presentLocalNotification(details)
            this.setState({ leftAppAt: new Date() })
        } else if (appState === 'active') {
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                this.props.onTimerEnd('fail')
            }
        }
    }

    handleLockStateChange = lockState => {
        console.log('lockState', lockState)
        if (lockState === 'locked') {
            this.setState({ locked: true })
        } else {
            this.setState({ locked: false })
        }
    }

    componentDidMount () {
        this.runTimer()
        AppState.addEventListener('change', this.handleAppStateChange)
        LockState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange)
        LockState.removeEventListener('change', this.handleAppStateChange)
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
