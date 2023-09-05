import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNewsStories } from "../store/newsDataSlice";
import { AppDispatch, RootState } from "../store/store";
import NewsItem from "../components/NewsItem";
import { REDUX_STATUS } from "../store/types";
import { PALETTE } from "../utils/palette";

const Home = () => {
  const { data, status } = useSelector((state: RootState) => state.news);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNewsStories());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getNewsStories());
    setRefreshing(false);
  }, []);

  if (status === REDUX_STATUS.SUCCEEDED) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={({ item }) => <NewsItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    );
  } else if (status === REDUX_STATUS.FAILED) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Failed to load</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={PALETTE.dark_grey} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PALETTE.background_grey,
  },
});

export default Home;
