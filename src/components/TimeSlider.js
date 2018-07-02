// packages
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Slider } from 'react-native-elements'

class TimeSlider extends React.Component {
    constructor () {
        super()

        this.state = {
            value: 5
        }
    }

    onPress = () => {
        this.props.onSetTimer(this.state.value)
    }

    render () {
        return ([
            <Text key='0' style={styles.header}>How long would you like to be pawductive?</Text>,
            <Slider
                key='1'
                style={styles.slider}
                value={this.state.value}
                minimumValue={5}
                maximumValue={90}
                onValueChange={(value) => this.setState({value: Math.round(value)})} />,
            <Text key='2'>Time: {this.state.value} minutes</Text>,
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
        paddingBottom: 20
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
