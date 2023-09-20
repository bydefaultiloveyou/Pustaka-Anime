import { View, TouchableOpacity, Text } from "react-native";
import COLOR from "../configurations/color";
import SCREEN from "../configurations/screen";
import SIZE from "../configurations/size";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/home";
import Search from "../screens/search";
import Container from "./container";
import Setting from "../screens/setting";

const Main = ({ children }) => {
  const [onTab, setTab] = useState("library");

  return (
    <>
      <Container>
        {onTab === "library" ? <Home /> : ""}
        {onTab === "search" ? <Search /> : ""}
        {onTab === "settings" ? <Setting /> : ""}
      </Container>

      {/* navigation bottom */}
      <View
        style={{
          position: "absolute",
          borderTopWidth: 1,
          borderColor: "rgba(255,255,255,.3)",
          flexDirection: "row",
          width: SCREEN.width,
          height: 60,
          backgroundColor: COLOR.blackSecond,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            height: "100%",
            width: SCREEN.width / 3,
            alignItems: "center",
          }}
          onPress={() => setTab("library")}
        >
          <Ionicons
            name="library"
            size={SIZE.medium}
            color={onTab === "library" ? COLOR.white : "rgba(255,255,255,.3)"}
          />
          <Text
            style={{
              color: onTab === "library" ? COLOR.white : "rgba(255,255,255,.3)",
              fontSize: SIZE.verySmall,
            }}
          >
            Pustaka
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            height: "100%",
            width: SCREEN.width / 3,
            alignItems: "center",
          }}
          onPress={() => setTab("search")}
        >
          <Ionicons
            name="search"
            size={SIZE.medium}
            color={onTab === "search" ? COLOR.white : "rgba(255,255,255,.3)"}
          />
          <Text
            style={{
              color: onTab === "search" ? COLOR.white : "rgba(255,255,255,.3)",
              fontSize: SIZE.verySmall,
            }}
          >
            Pencarian
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            height: "100%",
            width: SCREEN.width / 3,
            alignItems: "center",
          }}
          onPress={() => setTab("settings")}
        >
          <Ionicons
            name="settings-sharp"
            size={SIZE.medium}
            color={onTab === "settings" ? COLOR.white : "rgba(255,255,255,.3)"}
          />
          <Text
            style={{
              color:
                onTab === "settings" ? COLOR.white : "rgba(255,255,255,.3)",
              fontSize: SIZE.verySmall,
            }}
          >
            Tentang
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Main;
