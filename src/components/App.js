// packages
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PushNotification from 'react-native-push-notification'

// imports
import TimeSlider from 'components/TimeSlider'
import Timer from 'components/Timer'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            timerActive: false,
            timerEnd: false,
            timer: {}
        }
    }

    onSetTimer = timer => {
        this.setState({
            timerActive: true,
            timer
        })
    }

    onTimerEnd = () => {
        this.setState({
            timerActive: false,
            timerEnd: true
        })
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
                notification.finish(PushNotificationIOS.FetchResult.NoData);
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
    }

    render () {
        const { timerActive, timer } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Pawductivity!</Text>
                {timerActive
                    ? <Timer timer={timer} />
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
