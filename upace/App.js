import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from "react-native-paper";
import TimeCalc from "./screens/timeCalc";
import { NavigationContainer, DefaultTheme, DarkTheme as NavigatorDarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import light from "./themes/light";
import dark from "./themes/dark";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: NavigatorDarkTheme,
});

export default function App() {
    const theme = {
        ...MD3DarkTheme,
        ...dark,
    };

    return (
        <PaperProvider theme={theme}>
            <StatusBar style={"light"} />
            <NavigationContainer theme={DarkTheme}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={TimeCalc} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
