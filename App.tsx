import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "navigation/TabNavigator";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "components/Header";

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#1f2937" />
      <SafeAreaView>
      </SafeAreaView>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
  },
});