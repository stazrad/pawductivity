// packages
import React from 'react'
import { Text, View } from 'react-native'

// imports

export default class Display extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.goal}>{this.props.goal}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40
    },
    goal: {
        fontSize: 40,
        color: 'grey',
        fontStyle: 'italic'
    }
}
