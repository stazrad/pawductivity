// packages
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

// imports

export default class TimerScreen extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            outcome: props.outcome || 'success'
        }
    }

    render () {
        const { outcome } = this.state
        const source = `../../images/pet/dog/${outcome}-1.png`
        // TODO dynamic image routes

        return ([
            <View key='0' style={styles.imageContainer}>
                <Image
                source={require(`../../images/pet/dog/success-1.png`)}
                style={styles.image} />
            </View>,
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
