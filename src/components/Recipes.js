import { Image, Pressable, Text, View } from "react-native";

import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "./Loading";
const Recipes = ({ categories, meals }) => {
  const navigation = useNavigation();
  return (
    <View className="mx-3 space-y-3 my-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" color="green" className="mt-30" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View key={item.id}>
                <RecipeCard item={item} index={index} navigation={navigation} />
              </View>
            )}
            onEndReachedThreshold={0.1}
            refreshing={false} // Optional: for pull-to-refresh
            onRefresh={() => {}} // Optional: refresh callback
            onEndReached={() => {}}
          />
        )}
      </View>
    </View>
  );
};

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(100).delay(600).springify().damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(20) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        {/* 
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        /> */}
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Recipes;
