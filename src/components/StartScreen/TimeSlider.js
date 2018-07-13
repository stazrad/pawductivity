// packages
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Slider } from 'react-native-elements'

// imports
import theme from '../../theme'

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
        const { value } = this.state

        return (
            <View style={styles.container}>
                <Text key='2' style={styles.time}>{value}:00</Text>
                <Slider
                    key='1'
                    style={styles.slider}
                    value={value}
                    step={5}
                    thumbStyle={styles.thumbStyle}
                    trackStyle={styles.trackStyle}
                    minimumValue={5}
                    maximumValue={90}
                    onValueChange={(value) => this.setState({value})}
                />
                <View
                    key='3'
                    style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        title='FOCUS'
                        color={theme.white}
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
        justifyContent: 'center',
    },
    time: {
        fontSize: 40,
        color: theme.black,
        paddingBottom: 0,
        fontWeight: 'bold',
    },
    slider: {
        alignSelf: 'stretch',
    },
    thumbStyle: {
        backgroundColor: theme.black,
    },
    trackStyle: {
        backgroundColor: theme.black,
    },
    buttonContainer: {
        backgroundColor: theme.black,
        height: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    button: {
        height: 60,
        justifyContent: 'space-between'
    }
}
