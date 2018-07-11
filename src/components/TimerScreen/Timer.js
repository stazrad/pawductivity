// packages
import React from 'react'
import { AppState, Text } from 'react-native'
import PushNotification from 'react-native-push-notification'

export default class Timer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            startTime: props.timer.startTime,
            minutes: props.timer.amount - 1,
            seconds: 59
        }
    }

    startTimer = () => {
        const { totalTime } = this.props
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
                // TODO trigger completion
                alert('we done, homie')
                clearInterval(logger)
            }
        }, 1000)
    }

    handleAppStateChange (appState) {
        if (appState === 'background') {
            // https://facebook.github.io/react-native/docs/pushnotificationios.html
            const details = {
                alertBody: 'You left the app, bitch!'
            }
            PushNotification.presentLocalNotification(details)
        }
    }

    componentDidMount () {
        this.runTimer()
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnMount () {
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
        fontSize: 80,
        marginTop: 80,
    }
}
