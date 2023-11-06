import * as ScreenOrientation from "expo-screen-orientation";
import { View, Text, TouchableOpacity } from "react-native";
import SCREEN from "../configurations/screen";
import SIZE from "../configurations/size";
import COLOR from "../configurations/color";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../components/card";
import Loading from "../components/loading";
import database from "../configurations/database";
import Container from "../components/container";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const [activeScreen, setActiveScreen] = useState("recent");
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      return () => ScreenOrientation.unlockAsync();
    }, [])
  );

  useEffect(() => {
    setIsFetching(true);
    const fetchAnimes = async () => {
      const response = await axios.get(`${database.base_url}/${activeScreen}`);
      setAnimes(response.data);
      setIsFetching(false);
    };
    fetchAnimes();
  }, [activeScreen]);

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "center",
          width: SCREEN.width,
          height: 70,
          backgroundColor: COLOR.black,
        }}
      >
        <Text
          style={{
            fontSize: SIZE.large,
            fontWeight: "bold",
            color: COLOR.white,
          }}
        >
          Pustaka Anime
        </Text>
      </View>

      <View
        style={{
          gap: 10,
          backgroundColor: COLOR.black,
          paddingHorizontal: 15,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveScreen("recent")}
          style={{
            height: 30,
            width: 120,
            borderBottomColor: COLOR.white,
            borderBottomWidth: activeScreen === "recent" ? 2 : 0,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLOR.white,
              fontWeight: "500",
              fontSize: SIZE.small,
            }}
          >
            Episode Baru
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("animes")}
          style={{
            height: 30,
            width: 70,
            borderBottomColor: COLOR.white,
            borderBottomWidth: activeScreen === "animes" ? 2 : 0,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLOR.white,
              fontWeight: "500",
              fontSize: SIZE.small,
            }}
          >
            Semua
          </Text>
        </TouchableOpacity>
      </View>

      {!isFetching ? (
        <View
          style={{
            width: SCREEN.width,
            padding: 7,
            gap: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 150,
          }}
        >
          <View
            style={{
              marginVertical: 5,
              width: "100%",
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: COLOR.green,
              paddingVertical: 10,
              gap: 5,
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              name="bookmark"
              size={SIZE.medium}
              color="green"
            />
            <Text
              style={{
                color: COLOR.white,
                fontWeight: "500",
                fontSize: SIZE.small,
              }}
            >
              Hasil pencarian berasal dari web scrapping
            </Text>
          </View>
          {animes.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.title}
                thumbnail={item.cover}
                episode={item.episode}
                url={item.url}
                slug={item.slug}
                screen={activeScreen === "animes" ? "detail" : "stream"}
              />
            );
          })}
        </View>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Home;
