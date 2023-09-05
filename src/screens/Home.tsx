import { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNewsStories } from "../store/newsDataSlice";
import { AppDispatch, RootState } from "../store/store";
import NewsItem from "../components/NewsItem";
import { REDUX_STATUS } from "../store/types";

const Home = () => {
  const { data, status } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNewsStories());
  }, []);

  if (status === REDUX_STATUS.SUCCEEDED) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={({ item }) => <NewsItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
