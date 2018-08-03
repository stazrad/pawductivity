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
import moment from 'moment'

// imports
import theme from '../../theme'

let timeOfInactive
let timeOfBackground

export default class Timer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            startTime: props.timer.startTime,
            leftAppAt: null,
            unlocking: false,
            minutes: 0,//props.timer.amount - 1,
            seconds: 10
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
    }

    sendPushNotification = body => {
        // https://facebook.github.io/react-native/docs/pushnotificationios.html
        const details = {
            alertBody: body || 'Don\'t get distracted! Hurry back to continue being pawductive!'
        }

        PushNotificationIOS.presentLocalNotification(details)
    }

    handleAppStateChange = appState => {
        if (appState === 'inactive') {
            timeOfInactive = new Date()
        } else if (appState === 'background') {
            timeOfBackground = new Date()
            const timeDifference = Math.abs(timeOfInactive - timeOfBackground)
            console.log(timeDifference)

            if (timeDifference < 100) {
                // reasonably believe this is a phone lock
                const { minutes, seconds } = this.state
                // send push notification at the remainder of the timer from now
                const fireDate = moment().add(minutes, 'minutes').add(parseFloat(seconds), 'seconds')
                const details = {
                    alertTitle: '🐶 Way to go human!',
                    alertBody: `We stayed pawductive for ${this.props.timer.amount} minutes!`,
                    fireDate
                }

                PushNotificationIOS.scheduleLocalNotification(details)
                this.setState({ successTime: fireDate })
            } else {
                // reasonably belive this is a home button
                this.sendPushNotification('Did you push the home button?')
                this.setState({ leftAppAt: timeOfBackground, unlocking: false })
            }
        }
        if (appState === 'active' && !this.state.unlocking) {
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                this.props.onTimerEnd('fail')
            }
        }
    }

    handleLockStateChange = ({ lockState }) => {
        const locked = lockState === 'locked'
        const { successTime } = this.state

        if (lockState === 'unlocked') {
            const now = new Date()

            if (now - successTime > 0) {
                return this.props.onTimerEnd('success')
            }
            // TODO set new time in state
            this.setState({ minutes: 69, seconds: 69, unlocking: true })
        }
        console.log('locked', locked)
        this.setState({ locked })
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
