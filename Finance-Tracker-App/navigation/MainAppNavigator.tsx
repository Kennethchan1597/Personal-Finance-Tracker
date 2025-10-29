import Ionicons from "@react-native-vector-icons/ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransProvider } from "../context/TransContext";
import AnalyticsScreen from "../screens/main/AnalyticsScreen";
import HomeScreen from "../screens/main/HomeScreen";
import SettingsScreen from "../screens/main/SettingsScreen";
import TransactionsScreen from "../screens/main/TransactionsScreen";

export type BottomTabParamList = {
  Home: { username: string };
  Transactions: undefined;
  Settings: undefined;
  Analytics: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainAppNavigator() {
  return (
    <TransProvider>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Transactions") {
            iconName = focused ? "card" : "card-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return <Ionicons name={iconName} size={24} color="gray" />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
        initialRouteName="Home" >
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Transactions" component={TransactionsScreen}></Tab.Screen>
        <Tab.Screen name="Analytics" component={AnalyticsScreen}></Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
      </Tab.Navigator>
    </TransProvider>
  );
}