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
            goals: []
        }
    }

    onFocus = () => {
        // TODO pull up keyboard?
    }

    onChangeText = text => {
        this.setState({text})
    }

    addGoal = () => {
        this.setState({
            goals: [ ...this.state.goals, this.state.text],
            text: ''
        })
    }

    renderGoals = () => {
        return this.state.goals.map((goal, i) => (
            <Text key={i} style={styles.goalAdded}>{goal}</Text>
        ))
    }

    render () {
        return ([
            <Text key='0' style={styles.header}>Add goals for this session:</Text>,
            this.renderGoals(),
            <View key='1' style={styles.goalsContainer}>
                <TouchableHighlight
                    style={styles.iconContainer}
                    onPress={this.addGoal}
                    underlayColor='grey'>
                    <Icon
                        name='plus'
                        size={24}
                        color='black' />
                </TouchableHighlight>
                <View style={styles.inputContainer}>
                    <Input
                        placholder='Be pawductive!'
                        style={styles.input}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        value={this.state.text} />
                </View>
            </View>
        ])
    }
}

const styles = {
    header: {
        fontSize: 22,
        alignContent: 'flex-start',
        marginTop: 30,
        marginBottom: 10
    },
    goalsContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    inputContainer: {
        flex: 11,
        backgroundColor: '#b3e6ff',
        borderRadius: 5,
        justifyContent: 'center'
    },
    input: {
        paddingBottom: 2,
        color: 'black',
    },
    iconContainer: {
        flex: 1,
        paddingTop: 10,
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
