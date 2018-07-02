// packages
import React from 'react'
import { Text } from 'react-native'
import moment from 'moment'
moment().format('HH:mm:ss')

const formatTime = unformatted => unformatted

class Timer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            time: this.formatTime(props.totalTime)
        }
    }

    formatTime = unformatted => {
        console.log(moment().minute(unformatted))
        return unformatted
    }

    startTimer = () => {
        const { totalTime } = this.props
    }

    render () {
        return ([
            <Text>Timer set for {this.props.totalTime} minutes!</Text>,
            <Text>{this.state.time}</Text>
        ])
    }
}

export default Timer
