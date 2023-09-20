import { TouchableOpacity, ImageBackground, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SCREEN from "../configurations/screen";
import COLOR from "../configurations/color";
import SIZE from "../configurations/size";

const Card = ({ title, thumbnail, episode, url, slug, screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: SCREEN.width / 3 - 15 }}
      onPress={() => {
        navigation.navigate(screen, {
          title,
          thumbnail,
          episode,
          url,
          slug,
        });
      }}
    >
      <ImageBackground
        style={{
          width: SCREEN.width / 3 - 15,
          height: 140,
          overflow: "hidden",
          borderRadius: 10,
        }}
        source={{
          uri: thumbnail,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 5,
            left: 5,
          }}
        >
          {screen === "stream" ? (
            <Text
              style={{
                backgroundColor: "rgba(0, 0, 0, .3)",
                padding: 2,
                paddingHorizontal: 10,
                fontWeight: "500",
                color: COLOR.white,
                fontSize: SIZE.verySmall,
                borderRadius: 5,
              }}
            >
              Episode {episode}
            </Text>
          ) : (
            ""
          )}
        </View>
      </ImageBackground>
      <Text
        style={{
          color: COLOR.white,
          fontWeight: "500",
          lineHeight: 20,
          marginTop: 5,
        }}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
