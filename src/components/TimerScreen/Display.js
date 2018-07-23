// packages
import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

// imports
import theme from '../../theme'

const defaultGoals = [
    'Let\'s gooo!',
    'We got dis!'
]

export default class Display extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            goal: props.goal || defaultGoals[Math.floor(Math.random()*defaultGoals.length)]
        }
    }
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.goal}>{this.state.goal.toUpperCase()}</Text>
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
        fontSize: 20,
        color: theme.darkGrey,
        // fontStyle: 'italic'
    }
}

Display.propTypes = {
    goal: PropTypes.string,
}

Display.defaultProps = {
    goal: 'Let\'s goooo!'
}
