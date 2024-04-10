import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import HomeScreen from "./App/Screens/HomeScreen/HomeScreen.jsx";
import Navbar from "./App/Screens/Helper/Navbar.jsx";
import Footer from "./App/Screens/Helper/Footer.jsx";
import AudioProvider from "./App/Screens/Context/AudioProvider.jsx";

export default function App() {
  return (
    <AudioProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="black" />
        <Navbar />
        <HomeScreen />
        <Footer />
      </SafeAreaView>
    </AudioProvider>
  );
}
