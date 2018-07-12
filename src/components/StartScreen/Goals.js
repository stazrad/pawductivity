// packages
import React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
console.log(Keyboard)

// imports

export default class StartScreen extends React.Component {
    constructor () {
        super()

        this.state = {
            text: '',
            goal: ''
        }
    }

    onFocus = () => {
        // TODO pull up keyboard?
    }

    onChangeText = text => {
        this.setState({text})
    }

    addGoal = () => {
        const goal = this.state.text
        this.setState({goal})
        this.props.onSetGoal(goal)
    }

    render () {
        const { goal, text } = this.state

        return ([
            <Text key='0' style={styles.header}>Let's be pawductive!</Text>,
            <View key='1' style={styles.imageContainer}>
                <Image
                source={require('../../images/pet/dog/excited.png')}
                style={styles.image} />
            </View>,
            <KeyboardAvoidingView key='2' style={styles.goalsContainer}>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='Should we set a goal?'
                        placeholderTextColor='grey'
                        inputStyle={styles.input}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        value={text}
                        // multiline
                        focus={!goal} />
                </View>
                {text
                    ? <TouchableHighlight
                        style={styles.iconContainer}
                        onPress={this.addGoal}
                        underlayColor='#f1f1f1'
                        disabled={!text}>
                            <Icon
                                name={goal ? 'check' : 'plus'}
                                size={30}
                                color={text ? 'black' : '#ababab'} />
                        </TouchableHighlight>
                    : null
                }
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
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(181, 181, 181, 0.2)',
    },
    input: {
        flex: 1,
        fontSize: 25,
        alignSelf: 'stretch',
        fontStyle: 'italic',
        // fontWeight: 'bold',
        // paddingBottom: 20,
        color: 'black',
        borderBottomWidth: 3
    },
    iconContainer: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'stretch',
        borderRadius: 5
    },
    goalAdded: {
        fontSize: 16,
        alignSelf: 'stretch'
    }
})
