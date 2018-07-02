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
            totalTime: 0
        }
    }

    onSetTimer = time => {
        this.setState({
            timerActive: true,
            totalTime: time
        })
    }

    render () {
        const { timerActive, totalTime } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Pawductivity</Text>
                {timerActive
                    ? <Timer totalTime={totalTime} />
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
