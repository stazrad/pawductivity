// packages
import React from 'react'
import {
    Image,
    StyleSheet,
    View
} from 'react-native'

// imports
import theme from '../theme'

export default class ImageContainer extends React.Component {
    render () {
        return (
            <View style={styles.imageContainer}>
                <Image
                source={this.props.source}
                style={styles.image} />
            </View>
        )
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
})
