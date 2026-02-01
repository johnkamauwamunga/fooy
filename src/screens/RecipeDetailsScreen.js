import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import YoutubeIframe from "react-native-youtube-iframe";
import Loading from "../components/Loading";
const RecipeDetailsScreen = (props) => {
  let item = props.route.params;

  console.log("the params ", item);

  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  });

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      // console.log("recipe Detail ", response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
      // setCategories(response.data.categories);
    } catch (e) {
      (console, lof("error ", e));
    }
  };

  const ingridientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }

    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1 "
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 35,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-2 bg-white"
        >
          <Ionicons
            name="arrow-back"
            size={hp(3.5)}
            strokeWidth={4.5}
            color="#fbbf24"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full ml-2 bg-white mr-5"
        >
          <Ionicons
            name="heart"
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? `red` : `gray`}
          />
        </TouchableOpacity>
      </View>

      {/* meals description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </View>

          {/* ingridients */}
          <View className="space-y-4  mt-6">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-500"
            >
              {" "}
              Ingridients{" "}
            </Text>
            <View className="space-y-2 ml-3">
              {ingridientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full  my-2 mr-3"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600 ml-3"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* instructions */}
          <View className="space-y-4 mt-3 mb-3">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </View>

          {/* yt video on iframe */}
          {meal.strYoutube && (
            <View>
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-neutral-500 mb-3"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
