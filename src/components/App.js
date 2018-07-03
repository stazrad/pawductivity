// packages
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// imports
import TimeSlider from 'components/TimeSlider'
import Timer from 'components/Timer'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            timerActive: false,
            timerEnd: false,
            timer: {}
        }
    }

    onSetTimer = timer => {
        this.setState({
            timerActive: true,
            timer
        })
    }

    onTimerEnd = () => {
        this.setState({
            timerActive: false,
            timerEnd: true
        })
    }

    render () {
        const { timerActive, timer } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Pawductivity</Text>
                {timerActive
                    ? <Timer timer={timer} />
                    : <TimeSlider onSetTimer={this.onSetTimer} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cceeff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        alignContent: 'flex-start',
        paddingBottom: 200
    }
})
