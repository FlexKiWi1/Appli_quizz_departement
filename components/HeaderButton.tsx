import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

type HeaderButtonProp = {
    name: string;
    size: number;
    color: string;
} & TouchableOpacity["props"];

export default function HeaderButton({name, size, color, onPress, ...props}: HeaderButtonProp) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={onPress} {...props}>
        <Feather name="chevron-left" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.xxLarge,
        height: SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
})