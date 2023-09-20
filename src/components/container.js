import { StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SCREEN from "../configurations/screen";
import COLOR from "../configurations/color";

const Container = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        height: SCREEN.height,
        width: SCREEN.height,
        backgroundColor: COLOR.black,
      }}
    >
      <ScrollView>
        <StatusBar barStyle={"light-content"} backgroundColor={COLOR.black} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
