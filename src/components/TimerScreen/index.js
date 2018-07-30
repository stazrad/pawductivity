// packages
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

// imports
import Display from './Display'
import ImageContainer from '../ImageContainer'
import Timer from './Timer'

export default class TimerScreen extends React.Component {
    render () {
        const { onTimerEnd, switchScreen, timer} = this.props

        return ([
            <ImageContainer
                key='0'
                source={require('../../images/pet/dog/working-1.png')} />,
            <Timer
                key='1'
                timer={timer}
                onTimerEnd={onTimerEnd} />,
            <Display key='2' goal={timer.goal} />,
        ])
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    image: {
        alignSelf: 'stretch',
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'contain'
    }
})
