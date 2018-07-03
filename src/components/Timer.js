// packages
import React from 'react'
import { Text } from 'react-native'

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
            const hoursPassed = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutesPassed = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const secondsPassed = Math.floor((distance % (1000 * 60)) / 1000)
            const minutes = this.state.minutes - minutesPassed
            const seconds = this.state.seconds - 1
            console.log(this.state.minutes, this.state.seconds)

            this.setState({minutes, seconds})

            if (distance < 0) {
                clearInterval(logger)
            }
        }, 1000)
    }

    componentDidMount () {
        this.runTimer()
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
