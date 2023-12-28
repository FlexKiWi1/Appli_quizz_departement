import { TouchableOpacity } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuizSettings from "./QuizSettings";
import { View } from "react-native";
import HeaderButton from "../../components/HeaderButton";
import { COLORS, SIZES } from "../../constants/theme";
import Text from "../../components/Text";
import Header from "../../components/Header";
import QuizGame from "./QuizGame";
import { QuizProvider, useQuiz } from "../../contexts/QuizContext";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();


function QuizStackLayout({ route }) {
    const { quiz } = useQuiz()

    return <Stack.Navigator initialRouteName="quiz-game" screenOptions={({ route, navigation }) => ({
            headerTitle: () => <Header title={quiz.name} subtitle={`Level ${quiz.level}`} />,
            headerBackground: () => <View style={[{ backgroundColor: COLORS.black, alignItems: "center" }]} />,
            headerLeft: () => <HeaderButton name="chevron-left" size={SIZES.xxLarge} color={COLORS.white} onPress={() => navigation.goBack()} />,
            headerBackVisible: false,
        })}>
            <Stack.Screen name="settings" component={QuizSettings} />
            <Stack.Screen name="quiz-game" component={QuizGame} />
        </Stack.Navigator>
}

export default QuizStackLayout;