// packages
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Slider } from 'react-native-elements'

export default class TimeSlider extends React.Component {
    constructor () {
        super()

        this.state = {
            value: 25
        }
    }

    onPress = () => {
        const timerConfig = {
            amount: this.state.value,
            startTime: new Date().getTime()
        }
        this.props.onSetTimer(timerConfig)
    }

    render () {
        return (
            <View style={styles.container}>
                <Text key='2' style={styles.timeText}>Time: <Text style={styles.time}>{this.state.value}</Text> minutes</Text>
                <Slider
                    key='1'
                    style={styles.slider}
                    value={this.state.value}
                    minimumValue={5}
                    maximumValue={90}
                    increment={5}
                    onValueChange={(value) => this.setState({value: Math.round(value)})} />
                <View
                    key='3'
                    style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        title='Focus!'
                        color='white'
                        onPress={this.onPress} />
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 16,
        paddingBottom: 80,
    },
    timeText: {
        fontSize: 20,
        paddingBottom: 40,
    },
    time: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    slider: {
        alignSelf: 'stretch',
    },
    buttonContainer: {
        backgroundColor: 'black',
        alignSelf: 'stretch',
        marginTop: 20,
        borderRadius: 5
    },
    button: {
        flex: 1,
        justifyContent: 'space-between'
    }
}
