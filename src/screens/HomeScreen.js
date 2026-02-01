import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("ice");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  // get categories
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]); // Clear meals when changing category
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php",
      );
      setCategories(response.data.categories);
    } catch (e) {
      (console, lof("error ", e));
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      // console.log("recipes ", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
      // setCategories(response.data.categories);
    } catch (e) {
      (console, lof("error ", e));
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="pt-1 space-y-6"
      >
        {/* avatar and bell icon */}
        <View className="flex-row mx-4 mt-10 justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/hamburger.png")}
            style={{ height: hp(5), width: hp(5.3) }}
            className="rounded-full bg-slate-300"
          />
          <Ionicons name="notifications-outline" size={hp(4)} color="grey" />
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 mt-4 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Johnnie
          </Text>

          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own foodie,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* search */}
        <View className="flex-row mx-5 mt-4 justify-between bg-gray-400/20 rounded-full items-center p-[6px]">
          <TextInput
            placeholder="Your favorite food"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />

          <View className="bg-white rounded-full p-3">
            <Ionicons name="search-outline" size={hp(4)} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View className="mt-4 mx-1">
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
