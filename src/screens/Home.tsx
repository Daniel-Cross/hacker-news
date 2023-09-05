import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNewsStories } from "../store/newsDataSlice";
import { AppDispatch } from "../store/store";

const Home = () => {
  const { data } = useSelector((state: any) => state.news);
  const [newsData, setNewsData] = useState(data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNewsStories());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newsData}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
