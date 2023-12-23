import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, Text } from "react-native";

import Home from "./Home";
import { COLORS, SIZES } from "../../constants/theme";
import Settings from "./Settings";
import QuizList from "./QuizList";
import Map from "./Map";

const Tab = createBottomTabNavigator();

function TabLayout() {
    return <Tab.Navigator screenOptions={({route}) => ({

        // Header
        headerStyle: {backgroundColor: COLORS.black},

        // TabBar
        tabBarStyle: {position: "absolute", height: 65},
        tabBarBackground: () => <View style={[StyleSheet.absoluteFill, styles.tabBarContainer]} />,
        tabBarLabelStyle: {bottom: 10},
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grayLight,
        tabBarLabel: ({focused, children}) => <Text style={{fontWeight: focused ? "600" : "400", fontSize: SIZES.small, color: focused ? COLORS.white : COLORS.grayLight, bottom: 10}} children={children} />,
        tabBarIcon({color, focused, size}) {
            let iconName;

            if (route.name === "Home") {
                iconName = "home";
            } else if (route.name === "Map") {
                iconName = "map";
            } else if (route.name === "Quiz") {
                iconName = "list";
            } else if (route.name === "Settings") {
                iconName = "settings";
            }

            return <Feather name={iconName} size={size} color={color} />
        },
    })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Quiz" component={QuizList} />
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
}

const styles = StyleSheet.create({
    tabBarContainer: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: COLORS.grayDarkMedium,
        gap: 10,
    }
})

export default TabLayout;