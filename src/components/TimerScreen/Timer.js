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
            timerEnded: false,
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

            if (!this.state.timerEnded) this.setState({minutes, seconds})

            if (minutes == 0 && seconds == 0) {
                clearInterval(logger)
                this.props.onTimerEnd('success')
            }
        }, 1000)
    }

    sendPushNotification = body => {
        // https://facebook.github.io/react-native/docs/pushnotificationios.html
        const details = {
            alertTitle: '🐶 ruh roh!',
            alertBody: body || 'Did you get distracted by a squirrel?!'
        }

        PushNotificationIOS.presentLocalNotification(details)
    }

    handleAppStateChange = appState => {
        // leave app (home or lock)
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
                this.setState({ successTime: fireDate, locked: true })
            } else {
                // reasonably believe this is a home button
                this.sendPushNotification()
                this.setState({ locked: false })
            }
            this.setState({ leftAppAt: timeOfBackground })
        }

        // return to app
        if (appState === 'active' && !this.state.locked) {
            // return from a home button
            const now = new Date()
            const timeAway = now - this.state.leftAppAt

            if (timeAway > 10000) {
                // returned from home button too late
                this.setState({ timerEnded: true })
                this.props.onTimerEnd('fail')
            } else {
                // returned from home button in time
                PushNotificationIOS.getDeliveredNotifications(notifications => {
                    const identifiers = notifications.map(n => n.identifier)
                    PushNotificationIOS.removeDeliveredNotifications(identifiers)
                })
            }
        } else if (appState === 'active' && this.state.locked) {
            // returned from a phone lock
            const now = new Date()
            const { leftAppAt, minutes, seconds, successTime } = this.state
            // unlock after timer complete
            if (now - successTime > 0) {
                this.setState({ timerEnded: true })
                return this.props.onTimerEnd('success')
            }

            // unlocked with time remaining
            PushNotificationIOS.cancelAllLocalNotifications()
            const rawMin = moment.duration(successTime.diff(now)).asMinutes()
            const minRemaining = Math.floor(rawMin)
            let secRemaining = Math.floor((Math.abs(rawMin) * 60) % 60)

            if (secRemaining < 10) secRemaining = '0' + secRemaining
            this.setState({
                minutes: minRemaining,
                seconds: secRemaining,
                locked: false
            })
        }
    }

    componentDidMount () {
        this.runTimer()
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange)
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
