import Container from "../components/container";
import { ResizeMode, Video } from "expo-av";
import SCREEN from "../configurations/screen";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useMemo, useState, useRef } from "react";
import COLOR from "../configurations/color";
import { useRoute } from "@react-navigation/native";
import SIZE from "../configurations/size";
import axios from "axios";
import Kuramanime from "../configurations/kuramanime";
import Loading from "../components/loading";

const Stream = () => {
  const route = useRoute();
  const { episode, slug, title } = route.params;
  const [videoData, setVideoData] = useState([]);
  const [EpisodeSelected, setEpisodeSelected] = useState(episode);
  const [isFetching, setIsFetching] = useState(false);
  const [episodeCount, setEpisodeCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [videoResponse, episodeResponse] = await Promise.all([
        axios.get(Kuramanime.base_url + `/anime/${slug}/${EpisodeSelected}`),
        axios.get(Kuramanime.base_url + `/anime/${slug}`),
      ]);

      setVideoData(videoResponse.data.video);

      const episodeArray = Array.from(
        { length: episodeResponse.data.episode },
        (_, index) => index + 1
      );
      setEpisodeCount(episodeArray);
      setIsFetching(true);
    };

    fetchData();
  }, [slug, EpisodeSelected]);

  const videoUrl = useMemo(() => {
    const selectedVideo = videoData.find((video) => video.quality === "360p");
    return selectedVideo ? selectedVideo.url : "";
  }, [videoData, EpisodeSelected]);

  return (
    <Container>
      {isFetching ? (
        <>
          {/* video player */}
          <VideoPlayer url={videoUrl} isFetching={isFetching} />
          {/* information stream */}
          <View style={{ padding: 10, width: SCREEN.width, marginBottom: 20 }}>
            <Text
              numberOfLines={2}
              style={{
                opacity: 0.8,
                fontSize: SIZE.medium,
                color: COLOR.white,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                opacity: 0.5,
                fontSize: SIZE.small,
                color: COLOR.white,
                letterSpacing: 1,
              }}
            >
              Episode {EpisodeSelected}
            </Text>

            {/* show all episode */}
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <FlatList
                style={{ width: SCREEN.width }}
                data={episodeCount}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setEpisodeSelected(item);
                      setIsFetching(false);
                    }}
                  >
                    <BoxEpisode
                      episode={item}
                      episodeselected={EpisodeSelected}
                    />
                  </TouchableOpacity>
                )}
                horizontal
                keyExtractor={(item) => item.toString()}
              />
            </View>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const BoxEpisode = ({ episode, episodeselected }) => {
  return (
    <View
      style={{
        width: 50,
        marginRight: 10,
        height: 50,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          episode === episodeselected ? COLOR.green : COLOR.blackSecond,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: episode === episodeselected ? "#16FF00" : COLOR.white,
          fontWeight: "600",
          opacity: 0.8,
        }}
      >
        {episode}
      </Text>
    </View>
  );
};

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Video
        preload={true}
        resizeMode={ResizeMode.CONTAIN}
        ref={videoRef}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        useNativeControls
        shouldPlay
        source={{ uri: url }}
        style={{
          aspectRatio: 16 / 9,
          width: SCREEN.width,
        }}
      >
        {isLoading && (
          <Image
            style={{
              backgroundColor: COLOR.blackThird,
              height: 80,
              width: 80,
            }}
            source={{
              uri: "https://media.tenor.com/Fo2g7NgHs_EAAAAi/anime.gif",
            }}
          />
        )}
      </Video>
    </>
  );
};

export default Stream;
