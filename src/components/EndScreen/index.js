// packages
import React from 'react'
import {
    AsyncStorage,
    Button,
    Image,
    StyleSheet,
    View
} from 'react-native'
import PushNotification from 'react-native-push-notification'

// imports
import theme from '../../theme'
import StartScreen from '../StartScreen'

export default class TimerScreen extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            outcome: props.outcome || 'success'
        }
    }

    onPress = () => {
        this.props.switchScreen('start')
    }

    getSource = outcome => {
        switch(outcome) {
            case 'success':
                return require('../../images/pet/dog/success-1.png')
            case 'fail':
                return require('../../images/pet/dog/fail-1.png')
            default:
                return require('../../images/pet/dog/success-1.png')
        }
    }

    componentDidMount () {
        if (this.state.outcome === 'success') {
            this.props.setStoredTotalMinutes()
        }
        // TODO remove all delivered push notifications
        PushNotification.cancelAllLocalNotifications()
    }

    render () {
        const { outcome } = this.state

        return ([
            <View key='0' style={styles.imageContainer}>
                <Image
                source={this.getSource(outcome)}
                style={styles.image} />
            </View>,
            <StartScreen key='unique' />,
            <View
                key='1'
                style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    title={outcome === 'success' ? 'LET\'S GO AGAIN' : 'TRY AGAIN'}
                    color={theme.white}
                    onPress={this.onPress} />
            </View>
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
        fontWeight: 'bold',
        justifyContent: 'space-between'
    }
})
