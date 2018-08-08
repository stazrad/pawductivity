// packages
import React from 'react'
import RN, {
    AsyncStorage,
    DeviceEventEmitter,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import { createStackNavigator } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment'
moment().format()

// imports
import EndScreen from './EndScreen'
import StartScreen from './StartScreen'
import TimerScreen from './TimerScreen'
import theme from '../theme'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            outcome: undefined,
            screen: 'start',
            timerActive: false,
            timerEnd: false,
            timer: {}
        }
    }

    onTimerStart = timer => {
        this.setState({
            outcome: undefined,
            screen: 'timer',
            timerActive: true,
            timer
        })
    }

    onTimerEnd = outcome => {
        this.setState({
            outcome,
            screen: 'end',
            timerActive: false,
            timerEnd: true
        })
    }

    switchScreen = screen => {
        this.setState({ screen })
    }

    screenSwitcher = () => {
        const { outcome, screen, timer } = this.state

        switch(screen) {
            case 'start':
                return <StartScreen
                        onTimerStart={this.onTimerStart}
                        switchScreen={this.switchScreen} />
            case 'timer':
                return <TimerScreen
                        timer={timer}
                        onTimerEnd={this.onTimerEnd}
                        switchScreen={this.switchScreen} />
            case 'end':
                return <EndScreen
                        onTimerStart={this.onTimerStart}
                        outcome={outcome}
                        setStoredTotalMinutes={this.setStoredTotalMinutes} />
            default:
                return <StartScreen
                        onTimerStart={this.onTimerStart}
                        switchScreen={this.switchScreen} />
            }
    }

    getStoredTotalMinutes = async () => {
        try {
            return await AsyncStorage.getItem('totalMinutes')
        } catch (err) {
            // alert('error gettin!')
        }
    }

    setStoredTotalMinutes = async () => {
        try {
            const storedTotal = await this.getStoredTotalMinutes()
            const stored = parseFloat(storedTotal)
            const amount = parseFloat(this.state.timer.amount || '0')
            const newTotal = (stored + amount).toString()

            AsyncStorage.setItem('totalMinutes', newTotal)
            return newTotal
        } catch (err) {

        }
    }

    componentDidMount () {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token) => {
                console.log( 'TOKEN:', token );
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: (notification) => {
                console.log( 'NOTIFICATION:', notification );
                // process the notification
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        })
        SplashScreen.hide()
    }

    render () {
        const { screen, timerActive, timer } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                    source={require('../images/logo-text.png')}
                    style={styles.image} />
                </View>
                {this.screenSwitcher()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 25,
        marginBottom: 40,
        height: 28,
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
        resizeMode: 'contain',
    },
})
