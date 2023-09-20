import { View, Text, TouchableOpacity } from "react-native";
import SCREEN from "../configurations/screen";
import SIZE from "../configurations/size";
import COLOR from "../configurations/color";
import { useEffect, useState } from "react";
import axios from "axios";
import Kuramanime from "../configurations/kuramanime";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../components/card";
import Loading from "../components/loading";

const Home = () => {
  const [activeScreen, setActiveScreen] = useState("ongoing");
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    const fetchAnimes = async () => {
      const response = await axios.get(
        Kuramanime.base_url +
          `/popular?type=${activeScreen}&page=${Math.floor(Math.random() * 5)}`
      );
      setAnimes(response.data.list);
      setIsFetching(false);
    };
    fetchAnimes();
  }, [activeScreen]);

  return (
    <>
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

      {/* navigation tabs */}
      <View
        style={{
          gap: 10,
          backgroundColor: COLOR.black,
          paddingHorizontal: 15,
          flexDirection: "row",
        }}
      >
        {/* tabs item */}
        <TouchableOpacity
          onPress={() => setActiveScreen("ongoing")}
          style={{
            height: 30,
            width: 110,
            borderBottomColor: COLOR.white,
            borderBottomWidth: activeScreen === "ongoing" ? 2 : 0,
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
            Rekomendasi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen("movie")}
          style={{
            height: 30,
            width: 70,
            borderBottomColor: COLOR.white,
            borderBottomWidth: activeScreen === "movie" ? 2 : 0,
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
            Movie
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
                screen={activeScreen === "movie" ? "detail" : "stream"}
              />
            );
          })}
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
