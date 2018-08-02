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

    sendPushNotification = body => {
        // https://facebook.github.io/react-native/docs/pushnotificationios.html
        const details = {
            alertBody: body || 'Don\'t get distracted! Hurry back to continue being pawductive!'
        }

        PushNotificationIOS.presentLocalNotification(details)
    }

    handleAppStateChange = (appState, locked) => {
        console.log('appState/locked', appState, locked)
        const sender = () => setTimeout(() => {this.sendPushNotification('DIS BETTA BE LOCKED MFER');console.log('SENT MFER')},90)
        if (locked && appState === 'inactive') {
            // this catch is for phone lock
            // when the phone is locked, delayed events do not get through
            sender()
            this.setState({ leftAppAt: new Date() })
            return
        }
        if (appState === 'inactive') {
            console.log('CLEAR TIMEOUT')
            clearTimeout(sender)
            this.sendPushNotification()
            this.setState({ leftAppAt: new Date() })
        } else if (appState === 'active') {
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                this.props.onTimerEnd('fail')
            }
        }
    }

    handleLockStateChange = ({ lockState }) => {
        console.log('HANDLE LOCK', lockState)
        const locked = lockState === 'locked'

        if (locked) this.sendPushNotification()
        this.setState({ locked })
    }

    componentDidMount () {
        console.log('DID MOUNT')
        this.runTimer()
        AppState.addEventListener('change', (state) => setTimeout(this.handleAppStateChange.bind(this, state, false), 10))
        AppState.addEventListener('change', this.handleAppStateChange.bind(this, true))
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
