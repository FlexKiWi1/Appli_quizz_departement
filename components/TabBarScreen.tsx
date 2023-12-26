import { StyleSheet, Text, Animated, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { COLORS, SIZES } from '../constants/theme';


export default function TabBarScreen({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            })
          };

          return (
            <TouchableOpacity
              style={[
                isFocused
                  ? { backgroundColor: COLORS.primary }
                  : { backgroundColor: COLORS.grayDarkMedium },
                styles.button
              ]}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.key}
            >
              <Animated.Text style={[isFocused ? { color: COLORS.black, fontWeight: "600" } : { color: COLORS.grayLight }]}>
                {label as string}
              </Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 100,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    width: "50%",
    paddingVertical: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
})