// packages
import React from 'react'
import { View } from 'react-native'

// imports
import Timer from './Timer'

export default class TimerScreen extends React.Component {
    render () {
        return (
            <Timer timer={this.props.timer} />
        )
    }
}

// PropTypes.Timer = {
//     timer: PropTypes.
// }
