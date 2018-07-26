// packages
import React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

// imports
import theme from '../../theme'

export default class StartScreen extends React.Component {
    constructor () {
        super()

        this.state = {
            text: '',
            goal: '',
            goalSet: false,
        }
    }

    onChangeText = text => {
        if (this.state.goal) {
            this.setState({goal: '', goalSet: false})
        }
        this.setState({text})
    }

    onFocus = () => {
        this.setState({ text: '' })
    }

    addGoal = () => {
        const goal = this.state.text

        this.setState({
            goal,
            goalSet: true,
            text: '',
        })
        this.props.onSetGoal(goal)
        Keyboard.dismiss()
    }

    render () {
        const { goal, goalSet, text } = this.state

        return ([
            <View key='1' style={styles.imageContainer}>
                <Image
                source={require('../../images/pet/dog/ready-1.png')}
                style={styles.image} />
            </View>,
            <KeyboardAvoidingView
                key='2'
                style={styles.goalsContainer}
                behavior='padding'
                enabled>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={goal ? goal : 'WANT TO SET A GOAL?'}
                        placeholderTextColor={theme.black}
                        style={styles.input}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        value={text}
                        onSubmitEditing={this.addGoal}
                        returnKeyType='done' />
                </View>
                {/* {text && !goal
                    ? <TouchableHighlight
                        style={styles.textContainer}
                        onPress={this.addGoal}
                        underlayColor='orange'
                        disabled={!text}>
                            <Text style={styles.text}>SET GOAL</Text>
                        </TouchableHighlight>
                    : null
                } */}
            </KeyboardAvoidingView>
        ])
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        alignContent: 'flex-start',
        marginTop: 30,
        marginBottom: 10
    },
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
    goalsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    inputContainer: {
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        height: 50,
        backgroundColor: theme.grey,
    },
    input: {
        paddingBottom: 15,
        paddingTop: 15,
        color: theme.black,
    },
    textContainer: {
        height: 35,
        // justifyContent: 'center',
        // alignContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: theme.black,
        marginBottom: 10,
    },
    text: {
        color: theme.white,
        fontSize: 15,
        paddingTop: 8,
        textAlign: 'center',
        margin: 'auto',
    },
    goalAdded: {
        fontSize: 16,
        alignSelf: 'stretch',
    }
})
