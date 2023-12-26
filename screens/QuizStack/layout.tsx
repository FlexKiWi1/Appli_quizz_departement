import { TouchableOpacity } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuizSettings from "./QuizSettings";
import { View } from "react-native";
import HeaderButton from "../../components/HeaderButton";
import { COLORS, SIZES } from "../../constants/theme";
import Text from "../../components/Text";
import { headerStyle } from "../../styles/Header.style";
import Header from "../../components/Header";

const Stack = createNativeStackNavigator();

function QuizStackLayout({route}) {
    const {quiz} = route.params;

    return <Stack.Navigator screenOptions={({route, navigation}) => ({
        headerTitle: () => <Header title={quiz.name} subtitle={`Level ${quiz.level}`} />,
        headerBackground: () => <View style={[{backgroundColor: COLORS.black, alignItems: "center"}]} />,
        headerLeft: () => <HeaderButton name="chevron-left" size={SIZES.xxLarge} color={COLORS.white} onPress={() => navigation.goBack()} />,
        headerBackVisible: false,
    })}>
        <Stack.Screen name="settings" component={QuizSettings} />
    </Stack.Navigator>
}

export default QuizStackLayout;