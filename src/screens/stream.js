import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import axios from "axios";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import database from "../configurations/database";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../components/container";
import SCREEN from "../configurations/screen";
import SIZE from "../configurations/size";
import COLOR from "../configurations/color";
import { ResizeMode, Video } from "expo-av";
import SliderBase from "@react-native-community/slider";

const Stream = () => {
  const [resolution, setResolution] = useState("360");
  const [urlVideo, setUrlVideo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isShow, setIshow] = useState(true);
  const [videoStatus, setVideoStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPlaying, setPlaying] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const videoRef = useRef(null);
  const route = useRoute();
  const { title, slug, episode } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    setIsFetching(true);
    const fetchVideoAnime = async () => {
      const episodeResponse = await axios.get(
        `${database.base_url}/anime/${slug}/episode/${episode}`
      );
      setUrlVideo(await episodeResponse.data.video[resolution]);
      setIsFetching(false);
    };
    fetchVideoAnime();
  }, [slug, resolution, episode]);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      return () => ScreenOrientation.unlockAsync();
    }, [])
  );

  const onValueChange = (value) => {
    setSliderValue(value);
  };

  const onSlidingComplete = async (value) => {
    const position = value * videoStatus.durationMillis;
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(position);
      setSliderValue(value);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setVideoStatus(status);
    setSliderValue(status.positionMillis / status.durationMillis);
  };

  const format = (milis) => {
    if (videoRef.current) {
      const totalSecond = milis / 1000;
      const minutes = Math.floor(totalSecond / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(totalSecond % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    } else {
      return "00:00";
    }
  };

  const togglePause = async () => {
    if (!isPlaying) {
      await videoRef.current.playAsync();
    } else {
      await videoRef.current.pauseAsync();
    }
    setPlaying(!isPlaying);
  };

  const hideControlsAfterTimeout = () => {
    setTimeout(() => {
      if (!loading) {
        setIshow(false);
      }
    }, 5000);
  };

  useEffect(() => {
    hideControlsAfterTimeout();
  }, [loading]);

  return (
    <>
      <Container color="black">
        <StatusBar hidden></StatusBar>
        {isFetching ? (
          <View
            style={{
              backgroundColor: "black",
              height: SCREEN.height,
            }}
          >
            <View
              style={{
                paddingHorizontal: 50,
                paddingVertical: 25,
              }}
            >
              <ButtonBack />
            </View>
            <ActivityIndicator
              size={52}
              color={COLOR.greenNoOpacity}
              style={{ marginTop: "10%" }}
            />
          </View>
        ) : (
          <View
            style={{
              height: SCREEN.height,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: SCREEN.width,
                position: "absolute",
                width: "100%",
                alignItems: "center",
                zIndex: 99999,
                backgroundColor: "rgba(0,0,0,.5)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 50,
                  paddingVertical: 25,
                  justifyContent: "center",
                }}
              >
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      color: COLOR.white,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      letterSpacing: 0.5,
                      color: COLOR.white,
                      textAlign: "center",
                      opacity: 0.7,
                    }}
                  >
                    Episode {episode}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  zIndex: 99,
                  position: "absolute",
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {format(videoStatus.positionMillis)}
                  </Text>
                  <SliderBase
                    style={{ width: "80%" }}
                    thumbTintColor={"#22c55e"}
                    minimumTrackTintColor="#22c55e"
                    maximumTrackTintColor="white"
                    value={sliderValue || 0}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.01}
                    onValueChange={onValueChange}
                    onSlidingComplete={onSlidingComplete}
                  ></SliderBase>
                  <Text style={{ color: "white" }}>
                    {format(videoStatus.durationMillis)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 15,
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <AntDesign
                      name="caretleft"
                      size={SIZE.small}
                      color={COLOR.white}
                    />
                    <Text style={{ color: COLOR.white }}>KEMBALI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ color: COLOR.white }}>NEXT EPISODE</Text>
                    <FontAwesome
                      name="step-forward"
                      size={SIZE.small}
                      color={COLOR.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <Video
              ref={videoRef}
              style={{
                aspectRatio: 16 / 9,
                width: "100%",
                height: SCREEN.width,
              }}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              source={{ uri: urlVideo }}
            />
          </View>
        )}
      </Container>
    </>
  );
};

const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <Ionicons name="arrow-back" size={SIZE.large} color={COLOR.white} />
      <Text
        style={{ color: COLOR.white, fontSize: SIZE.small, fontWeight: "600" }}
      >
        KEMBALI
      </Text>
    </TouchableOpacity>
  );
};

const Header = ({ title }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
      }}
    >
      <ButtonBack />
      <View style={{ width: "33.33%", height: 80, justifyContent: "center" }}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          Pustaka Anime
        </Text>
        <Text
          numberOfLines={2}
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Stream;
