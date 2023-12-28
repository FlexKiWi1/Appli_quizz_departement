import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, Text } from "react-native";

import Home from "./Home";
import Map from "./Map";
import QuizList from "./QuizList";
import Settings from "./Settings";
import { COLORS, SIZES } from "../../constants/theme";
import Header from "../../components/Header";
import AvatarButton from "../../components/AvatarButton";
import images from "../../constants/images";
import { navigate } from "../../utils/navigation";
import { useModule } from "../../contexts/ModuleContext";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function TabLayout() {
    const {module} = useModule()

    return <Tab.Navigator screenOptions={({route, navigation}) => ({
        // Header
        headerTitle: () => <Header title={route.name} />,
        headerStyle: {backgroundColor: COLORS.black},
        headerLeft: (props) => {
            return <AvatarButton source={module.iconSource} onPress={() => navigate("module", {screen: "user-module-list"})} />
        },

        // TabBar
        tabBarStyle: {position: "absolute", height: 65, borderTopWidth: 0, paddingHorizontal: 10},
        tabBarBackground: () => <View style={[StyleSheet.absoluteFill, styles.tabBarContainer]} />,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grayLight,

        tabBarLabelStyle: {bottom: 10},
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
        {/* <Tab.Screen name="Settings" component={Settings} /> */}
    </Tab.Navigator>
}

const styles = StyleSheet.create({
    tabBarContainer: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: COLORS.black,
        gap: 10,
    }
})

export default TabLayout;