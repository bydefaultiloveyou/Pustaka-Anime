import Container from "../components/container";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import COLOR from "../configurations/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import SCREEN from "../configurations/screen";
import SIZE from "../configurations/size";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import axios from "axios";
import Kuramanime from "../configurations/kuramanime";
import Loading from "../components/loading";
import { Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Detail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, thumbnail, slug } = route.params;
  const [animeData, setAnimeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [episodeCount, setEpisodeCount] = useState([]);

  useEffect(() => {
    const fetchDetailAnime = async () => {
      const [animeResponse] = await Promise.all([
        axios.get(Kuramanime.base_url + `/anime/${slug}`),
      ]);

      const episodeArray = Array.from(
        { length: animeResponse.data.episode },
        (_, idx) => idx + 1
      );

      setEpisodeCount(episodeArray);
      setAnimeData(animeResponse.data);
      setIsLoading(false);
    };
    fetchDetailAnime();
  }, []);

  return (
    <Container>
      {!isLoading ? (
        <View style={{ marginBottom: 100 }}>
          {/* Jumbotron */}
          <Jumbotron
            url={animeData.url}
            title={title}
            thumbnail={thumbnail}
            season={animeData.season}
          />

          {/* sinopsis */}
          <View style={{ paddingHorizontal: 15, width: SCREEN.width }}>
            <Text
              style={{ color: COLOR.white, opacity: 0.5, fontWeight: "500" }}
            >
              Sinopsis :
            </Text>
            <Text
              style={{ color: COLOR.white, opacity: 0.5, fontWeight: "400" }}
            >
              {animeData.synopsis}
            </Text>
          </View>

          {/* genre */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 20,
              flexWrap: "wrap",
              paddingHorizontal: 15,
              marginTop: 20,
              width: SCREEN.width,
            }}
          >
            {/* box */}
            {animeData.genre.map((genre, idx) => {
              return (
                <Text
                  key={idx}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 5,
                    fontSize: SIZE.small,
                    backgroundColor: COLOR.green,
                    color: COLOR.white,
                    opacity: 0.5,
                  }}
                >
                  {genre}
                </Text>
              );
            })}
          </View>

          {/* episode */}
          <View style={{ paddingHorizontal: 15, width: SCREEN.width }}>
            <Text
              style={{
                color: COLOR.white,
                opacity: 0.5,
                fontWeight: "500",
                marginBottom: 15,
              }}
            >
              Daftar Episode :
            </Text>

            {/* box */}
            {episodeCount.map((eps, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    navigation.navigate("stream", {
                      slug: animeData.slug,
                      episode: eps,
                      title: animeData.title,
                    });
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.blackThird,
                    paddingVertical: 15,
                    backgroundColor: COLOR.blackSecond,
                    opacity: 0.5,
                    gap: 10,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="smileo"
                    size={SIZE.small}
                    color={COLOR.white}
                  />
                  <Text style={{ color: COLOR.white }}>Episode {eps}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const Jumbotron = ({ title, thumbnail, season, url }) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{ uri: thumbnail }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        width: SCREEN.width,
      }}
    >
      <LinearGradient
        colors={[
          "rgba(34, 34, 34, .8)",
          "rgba(34, 34, 34, .9)",
          "rgba(34, 34, 34, 1)",
          "rgba(34, 34, 34, 1)",
        ]}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></LinearGradient>

      <View
        style={{
          width: SCREEN.width,
          position: "absolute",
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          top: 0,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLOR.white} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://kuramanime.pro/")}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ color: COLOR.white, fontWeight: "500" }}>
                Kuramanime
              </Text>
              <MaterialCommunityIcons
                name="database"
                size={16}
                style={{ marginTop: 2 }}
                color={COLOR.white}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <MaterialCommunityIcons name="web" size={24} color={COLOR.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 70 }}>
        <Image
          style={{
            width: 120,
            resizeMode: "cover",
            height: 170,
            marginTop: 2,
            borderRadius: 10,
          }}
          source={{ uri: thumbnail }}
        />
        <View
          style={{
            width: 200,
            paddingHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZE.medium,
              color: COLOR.white,
              marginBottom: 5,
            }}
            numberOfLines={4}
          >
            {title}
          </Text>
          <Text style={{ color: COLOR.white, opacity: 0.5, fontWeight: "500" }}>
            {season}
          </Text>
        </View>
      </View>
      {/* header */}
    </ImageBackground>
  );
};

export default Detail;
