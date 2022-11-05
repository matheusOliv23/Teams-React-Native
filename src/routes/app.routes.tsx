import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "@screens/Groups";
import NewGroup from "@screens/NewGroup";
import Players from "@screens/Players";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { COLORS } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="groups" component={Groups} />
        <Screen name="players" component={Players} />
        <Screen name="new" component={NewGroup} />
      </Navigator>
    </View>
  );
}
