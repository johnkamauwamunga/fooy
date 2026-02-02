import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(200).springify().damping(12)}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-500" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center ml-3 "
            >
              <View
                style={{ width: hp(7), height: hp(7) }}
                className={
                  "rounded-full p-[6px] items-center justify-center " +
                  activeButtonClass
                }
              >
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />

                {/* <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                /> */}
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
