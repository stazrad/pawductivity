// packages
import React from 'react'
import { View } from 'react-native'

// imports
import Display from './Display'
import Timer from './Timer'

export default class TimerScreen extends React.Component {
    render () {
        return ([
            <Display key='0' goal={this.props.timer.goal} />,
            <Timer key='1' timer={this.props.timer} />
        ])
    }
}

// PropTypes.Timer = {
//     timer: PropTypes.
// }
