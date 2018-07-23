// packages
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

// imports
import Display from './Display'
import Timer from './Timer'

export default class TimerScreen extends React.Component {
    render () {
        return ([
            <View key='0' style={styles.imageContainer}>
                <Image
                source={require('../../images/pet/dog/working-1.png')}
                style={styles.image} />
            </View>,
            <Timer key='1' timer={this.props.timer} />,
            <Display key='2' goal={this.props.timer.goal} />,
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
