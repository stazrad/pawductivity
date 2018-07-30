// packages
import React from 'react'
import { AppState, PushNotificationIOS, Text } from 'react-native'
import PushNotification from 'react-native-push-notification'

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
            minutes: 0,// props.timer.amount - 1, FIXME
            seconds: 5
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
        // TODO figure out how to check if phone locked
        console.log('appState', appState)
        if (appState === 'background') {
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
