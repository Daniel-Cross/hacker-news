import {
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NewsItemProps } from "../store/types";
import { EDGE_MARGIN, STANDARD_MARGIN } from "../utils/constants";
import { FONT_TITLE, FONT_BODY, FONT_SMALL } from "../utils/typography";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";

const NewsItem = ({ title, score, url, time, by, karma }: NewsItemProps) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "You won't believe this!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of result.activityType");
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onOpenUrl = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>by: {by}</Text>
        <View style={styles.karmaContainer}>
          <Text style={styles.karma}>{karma}</Text>
          <FontAwesome name="heart" size={12} color="#FE251B" />
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <FontAwesome name="thumbs-o-up" size={20} color="black" />
      </View>
      <Text style={styles.time}>{format(time, "eeee do MMMM")}</Text>
      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.linkButton} onPress={() => onOpenUrl()}>
          <FontAwesome5 name="link" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => onShare()}>
          <FontAwesome name="share" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: EDGE_MARGIN,
    marginVertical: STANDARD_MARGIN,
    padding: STANDARD_MARGIN,
    borderRadius: STANDARD_MARGIN,
    borderWidth: 1,
    borderColor: "#000",
  },
  title: {
    ...FONT_TITLE,
    marginBottom: STANDARD_MARGIN,
  },
  time: {
    ...FONT_SMALL,
    marginBottom: STANDARD_MARGIN,
  },
  scoreContainer: {
    position: "absolute",
    right: STANDARD_MARGIN,
    bottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    ...FONT_TITLE,
    marginRight: 4,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  karmaContainer: {
    backgroundColor: "#2081C3",
    borderRadius: 50,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  karma: {
    ...FONT_SMALL,
    textAlign: "left",
    paddingRight: 4,
    color: "#fff",
  },
  userName: {
    ...FONT_SMALL,
    paddingRight: 4,
  },
  url: {
    ...FONT_BODY,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: STANDARD_MARGIN,
    width: "20%",
  },
  linkButton: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
