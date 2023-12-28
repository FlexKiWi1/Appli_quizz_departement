import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserModuleList from "./UserModuleList";
import AddModule from "./AddModule";
import Header from "../../components/Header";
import { COLORS } from "../../constants/theme";
import { View } from "react-native";

const Stack = createNativeStackNavigator()


function ModuleStackLayout() {
    return <Stack.Navigator screenOptions={({route}) => ({
        headerTitle: () => <Header title={route.params?.name} />,
        headerBackground: () => <View style={[{ alignItems: "center" }]} />,
        headerBackVisible: false,
    })}>
        <Stack.Screen name="user-module-list" component={UserModuleList} initialParams={{name: "Inter Geo Quiz"}} />
        <Stack.Screen name="add-module" component={AddModule} />
    </Stack.Navigator>
}

export default ModuleStackLayout;