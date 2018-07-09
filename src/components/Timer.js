// packages
import React from 'react'
import { AppState, Text } from 'react-native'
import PushNotification from 'react-native-push-notification'

class Timer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            startTime: props.timer.startTime,
            minutes: props.timer.amount - 1,
            seconds: 59
        }
    }

    formatTime = unformatted => {
        console.log(unformatted)
        return unformatted
    }

    startTimer = () => {
        const { totalTime } = this.props
    }

    runTimer = () => {
        const { startTime } = this.state

        const logger = setInterval(() => {
            const now = new Date().getTime()
            const distance = now - startTime
            const secondsPassed = Math.floor((distance % (1000 * 60)) / 1000)
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
                alert('we done, homie')
                clearInterval(logger)
            }
        }, 1000)
    }

    componentDidMount () {
        this.runTimer()
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnMount () {
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

    handleAppStateChange (appState) {
        if (appState === 'background') {
            // TODO add push notification here
            const details = {
                alertBody: 'You left the app, bitch!'
            }
            PushNotification.presentLocalNotification(details)
        }
    }

    render () {
        const { minutes, seconds } = this.state
        const { amount } = this.props.timer

        return ([
            <Text key='0'>Timer set for {amount} minutes!</Text>,
            <Text key='1' style={styles.numbers}>{minutes}:{seconds}</Text>
        ])
    }
}

const styles = {
    numbers: {
        fontSize: 80,
        marginTop: 80
    }
}

export default Timer
