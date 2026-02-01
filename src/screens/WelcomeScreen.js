import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const WelcomeScreen = () => {
  const animationProgress = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Start animation
    animationProgress.value = withTiming(1, {
      duration: 2500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    });

    // Navigate after animation completes
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // Ring animation
  const ring1Style = useAnimatedStyle(() => ({
    padding: interpolate(
      animationProgress.value,
      [0, 0.5, 1],
      [0, hp(6), hp(5)],
    ),
    opacity: interpolate(animationProgress.value, [0, 0.2, 1], [0, 1, 1]),
  }));

  const ring2Style = useAnimatedStyle(() => ({
    padding: interpolate(
      animationProgress.value,
      [0, 0.6, 1],
      [0, hp(5), hp(4)],
    ),
    opacity: interpolate(animationProgress.value, [0, 0.3, 1], [0, 1, 1]),
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 0.3, 1], [0, 1, 1]),
    transform: [
      {
        scale: interpolate(
          animationProgress.value,
          [0, 0.5, 0.7, 1],
          [0.5, 1.1, 1, 1],
        ),
      },
    ],
  }));

  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0.7, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(animationProgress.value, [0.7, 1], [30, 0]),
      },
    ],
  }));

  return (
    <View className="flex-1 bg-amber-500 justify-center items-center">
      <StatusBar style="light" />

      {/* logo with animated rings */}
      <View className="items-center justify-center">
        <Animated.View
          className="absolute bg-white/20 rounded-full"
          style={ring1Style}
        />
        <Animated.View
          className="absolute bg-white/30 rounded-full"
          style={ring2Style}
        />
        <Animated.View style={logoStyle}>
          <Image
            source={require("../../assets/images/pizza.png")}
            style={{ width: 200, height: 200 }}
            className="rounded-full"
          />
        </Animated.View>
      </View>

      {/* animated text */}
      <Animated.View
        className="absolute bottom-20 items-center px-4"
        style={textContainerStyle}
      >
        <Text
          style={{ fontSize: hp(7) }}
          className="text-white font-bold tracking-widest text-center"
        >
          Foodie
        </Text>
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-medium text-white tracking-widest mt-4 text-center"
        >
          Food is always right
        </Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
