import { TextInput, View } from "react-native";
import SCREEN from "../configurations/screen";
import COLOR from "../configurations/color";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Kuramanime from "../configurations/database";
import Card from "../components/card";
import Loading from "../components/loading";

const Search = () => {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchAnimeFromSearch = async () => {
      const response = await axios.get(
        Kuramanime.base_url + `/search?page=1&query=${search}`
      );
      setAnimeData(response.data.list);
      setIsFetching(false);
    };

    fetchAnimeFromSearch();
  }, [search]);
  return (
    <>
      <View
        style={{
          padding: 10,
          width: SCREEN.width,
        }}
      >
        <View
          style={{
            opacity: 0.6,
          }}
        >
          <Ionicons
            name="search"
            color={COLOR.white}
            size={24}
            style={{ position: "absolute", top: 6, left: 10 }}
          />
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={COLOR.white}
            style={{
              fontWeight: "400",
              color: COLOR.white,
              backgroundColor: COLOR.blackSecond,
              borderRadius: 15,
              paddingVertical: 5,
              paddingLeft: 45,
            }}
            placeholder="Cari anime"
          ></TextInput>
        </View>
        {!isFetching ? (
          <View
            style={{
              width: SCREEN.width,
              paddingTop: 20,
              gap: 13,
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 150,
            }}
          >
            {animeData.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.title}
                  thumbnail={item.cover}
                  episode={item.episode}
                  url={item.url}
                  slug={item.slug}
                  screen={"detail"}
                />
              );
            })}
          </View>
        ) : (
          <Loading />
        )}
      </View>
    </>
  );
};

export default Search;
