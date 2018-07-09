// packages
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Slider } from 'react-native-elements'
import moment from 'moment'
moment().format('HH:mm:ss')

class TimeSlider extends React.Component {
    constructor () {
        super()

        this.state = {
            value: 25
        }
    }

    onPress = () => {
        const timer = {
            amount: this.state.value,
            startTime: new Date().getTime()
        }
        this.props.onSetTimer(timer)
    }

    render () {
        return ([
            <Text key='0' style={styles.header}>How long would you like to be pawductive?</Text>,
            <Text key='2' style={styles.timeText}>Time: <Text style={styles.time}>{this.state.value}</Text> minutes</Text>,
            <Slider
                key='1'
                style={styles.slider}
                value={this.state.value}
                minimumValue={5}
                maximumValue={90}
                onValueChange={(value) => this.setState({value: Math.round(value)})} />,
            <View
                key='3'
                style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    title='Focus!'
                    color='white'
                    onPress={this.onPress} />
            </View>
        ])
    }
}

const styles = {
    header: {
        fontSize: 16,
        paddingBottom: 80
    },
    timeText: {
        fontSize: 20
    },
    time: {
        fontSize: 30
    },
    slider: {
        alignSelf: 'stretch',
        margin: 40
    },
    buttonContainer: {
        backgroundColor: 'black',
        width: 100,
        marginTop: 20,
        borderRadius: 5
    }
}

export default TimeSlider
