import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(50);

  const navigation = useNavigation();

  // Create animated styles
  const ring1Style = useAnimatedStyle(() => ({
    padding: ring1Padding.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    padding: ring2Padding.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  useEffect(() => {
    // Start animations in sequence
    ring1Padding.value = withDelay(300, withSpring(heightPercentageToDP(5)));
    ring2Padding.value = withDelay(500, withSpring(heightPercentageToDP(4)));

    // Fade in logo
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));

    // Animate text after rings
    textOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(1200, withSpring(0, { damping: 12 }));

    // Navigate to home after a delay (let user see the animation)
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 3000); // 3 seconds total

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-amber-500 justify-center items-center">
      <StatusBar style="light" />

      {/* logo with rings */}
      <View className="items-center justify-center">
        <Animated.View className="bg-white/20 rounded-full" style={ring1Style}>
          <Animated.View
            className="bg-white/30 rounded-full"
            style={ring2Style}
          >
            <Animated.View style={logoStyle}>
              <Image
                source={require("../../assets/images/pizza.png")}
                style={{ width: 200, height: 200 }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>

      {/* title and punchline with animation */}
      <Animated.View className="flex items-center mt-10 px-4" style={textStyle}>
        <Text
          style={{ fontSize: heightPercentageToDP(7) }}
          className="text-white font-bold tracking-widest text-center"
        >
          Foodie
        </Text>
        <Text
          style={{ fontSize: heightPercentageToDP(2.5) }}
          className="font-medium text-white tracking-widest mt-4 text-center"
        >
          Food is always right
        </Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
