// packages
import React from 'react'
import { Keyboard, Text, TouchableHighlight, View } from 'react-native'
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
            <Text key='0' style={styles.header}>Set a Goal:</Text>,
            <View key='1' style={styles.goalsContainer}>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='Be pawductive...'
                        placeholderTextColor='#c3c3c3'
                        inputStyle={styles.input}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        value={text}
                        // multiline
                        focus={!goal}
                        leftIcon={
                            <TouchableHighlight
                                style={styles.iconContainer}
                                onPress={this.addGoal}
                                underlayColor='#f1f1f1'
                                disabled={!text}>
                                <Icon
                                    name={goal ? 'check' : 'plus'}
                                    size={30}
                                    color={text ? 'black' : '#ababab'} />
                            </TouchableHighlight>
                        } />
                </View>
            </View>
        ])
    }
}

const styles = {
    header: {
        fontSize: 40,
        alignContent: 'flex-start',
        marginTop: 30,
        marginBottom: 10
    },
    goalsContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    inputContainer: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center'
    },
    input: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 2,
        color: 'black',
        borderBottomWidth: 3
    },
    iconContainer: {
        paddingTop: 5,
        paddingLeft: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 5
    },
    goalAdded: {
        fontSize: 16,
        alignSelf: 'stretch'
    }
}
