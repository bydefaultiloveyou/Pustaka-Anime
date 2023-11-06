import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/components/main";
import Detail from "./src/screens/detail";
import Stream from "./src/screens/stream";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="stream" component={Stream} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
