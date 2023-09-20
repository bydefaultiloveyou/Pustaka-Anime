import { View, Image, Text } from "react-native";
import SCREEN from "../configurations/screen";
import COLOR from "../configurations/color";

const Loading = () => {
  return (
    <View
      style={{
        width: SCREEN.width,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%", alignItems: "center" }}>
        <Image
          style={{ width: 130, height: 170, marginRight: 50, marginBottom: 20 }}
          source={{
            uri: "https://media.tenor.com/n1GNGQYlVJ8AAAAi/kakaotalk-emoticon.gif",
          }}
        ></Image>
        <Text
          style={{
            color: COLOR.white,
            opacity: 0.5,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Anime sedang dimuat dengan kerja paksa, sabar dulu ya sayang
        </Text>
      </View>
    </View>
  );
};

export default Loading;
