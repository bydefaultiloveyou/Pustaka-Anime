import { View, Text } from "react-native";
import SCREEN from "../configurations/screen";
import COLOR from "../configurations/color";
import SIZE from "../configurations/size";

const Setting = () => {
  return (
    <View>
      <View
        style={{
          height: 150,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            opacity: 0.8,
            color: COLOR.white,
            fontWeight: "bold",
            fontSize: SIZE.large,
          }}
        >
          Hai, Teman
        </Text>
        <Text
          style={{
            opacity: 0.5,
            color: COLOR.white,
            fontWeight: "400",
          }}
        >
          &copy; Pustaka Anime
        </Text>
      </View>
      <View
        style={{
          backgroundColor: COLOR.blackSecond,
          height: SCREEN.height / 1.4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: SCREEN.width,
          padding: 20,
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            fontSize: SIZE.medium,
            fontWeight: "500",
            color: COLOR.white,
            opacity: 0.7,
          }}
        >
          Tentang Aplikasi
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: COLOR.white,
            opacity: 0.7,
          }}
        >
          Aplikasi ini hanya menyediakan layanan pencarian dan tautan
          berdasarkan intruksi pencarian anda. hasil pencarian berasal dari
          situs web pihak ketiga, aplikasi ini tidak menghosting konten apapun
          di servernya sendiri, dan tidak mengedit, menyusun, atau mengubah
          konten dari situs web pihak ketiga, hasil pencarian tidak mewakili
          persetujuan atau dukungan aplikasi ini terhadap pandangan situs web
          pihak ketiga, pembenaran dan keabsahan konten yang di tautkan adalah
          keputusan anda dan tanggung jawab secara pribadi
        </Text>
      </View>
    </View>
  );
};

export default Setting;
