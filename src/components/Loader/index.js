import React, { useEffect } from 'react'
import { Image, View, Text, ActivityIndicator } from 'react-native'
import COLORS from '../../colors'


const Loader = ({ style }) => {
    return (
        <View style={style}>
            <ActivityIndicator size="large" color={COLORS.purple} />
        </View>
    )
}

export default Loader
