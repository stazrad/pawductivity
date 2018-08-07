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
            failed: false,
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

            if (!this.state.failed) this.setState({minutes, seconds})

            if (minutes == 0 && seconds == 0) {
                clearInterval(logger)
                this.props.onTimerEnd('success')
            }
        }, 1000)
    }

    sendPushNotification = body => {
        // https://facebook.github.io/react-native/docs/pushnotificationios.html
        const details = {
            alertTitle: '🐶 Uh oh!',
            alertBody: body || 'Did you get distracted by a squirrel?!'
        }

        PushNotificationIOS.presentLocalNotification(details)
    }

    handleAppStateChange = appState => {
        if (appState === 'inactive') {
            // inactive always fires before background
            timeOfInactive = new Date()
        } else if (appState === 'background') {
            timeOfBackground = new Date()
            const timeDifference = Math.abs(timeOfInactive - timeOfBackground)
            // TODO persist timeDifference data somewhere
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
                // reasonably believe this is a home button
                this.sendPushNotification()
                this.setState({ unlocking: false })
            }
            this.setState({ leftAppAt: timeOfBackground })
        }
        if (appState === 'active' && !this.state.unlocking) {
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                // returned from home button too late
                this.setState({ failed: true })
                this.props.onTimerEnd('fail')
            } else {
                // returned from home button in time
                PushNotificationIOS.getDeliveredNotifications(notifications => {
                    const identifiers = notifications.map(n => n.identifier)
                    PushNotificationIOS.removeDeliveredNotifications(identifiers)
                })
            }
        }
    }

    handleLockStateChange = ({ lockState }) => {
        const locked = lockState === 'locked'
        const { leftAppAt, minutes, seconds, successTime } = this.state

        if (lockState === 'unlocked') {
            // returned from a phone lock
            const now = new Date()

            if (now - successTime > 0) {
                return this.props.onTimerEnd('success')
            }
            // unlocked with time remaining
            PushNotificationIOS.cancelAllLocalNotifications()
            const rawMin = moment.duration(successTime.diff(now)).asMinutes()
            const minRemaining = Math.floor(rawMin)
            let secRemaining = Math.floor((Math.abs(rawMin) * 60) % 60)

            if (secRemaining < 10) secRemaining = '0' + secRemaining
            this.setState({ minutes: minRemaining, seconds: secRemaining, unlocking: true })
        }
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
