import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NewsItemProps } from "../store/types";
import { EDGE_MARGIN, STANDARD_MARGIN } from "../utils/constants";
import { FONT_TITLE, FONT_BODY } from "../utils/typography";

const NewsItem = ({
  title,
  score,
  url,
  time,
  authorId,
  karma,
}: NewsItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.url}>{url}</Text>
    </TouchableOpacity>
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
  },
  time: {
    ...FONT_BODY,
  },
  scoreContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: STANDARD_MARGIN,
    bottom: STANDARD_MARGIN,
    padding: 4,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  score: {
    ...FONT_TITLE,
  },

  url: {
    ...FONT_BODY,
  },
});
