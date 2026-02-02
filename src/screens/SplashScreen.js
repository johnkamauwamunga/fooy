import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const SplashScreen = () => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  const navigateToWelcome = () => {
    navigation.replace("Welcome");
  };

  useEffect(() => {
    const init = async () => {
      // Hide native splash screen
      await RNBootSplash.hide({ fade: true });

      // Start custom animation
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });

      scale.value = withTiming(1.2, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });

      // Navigate after animation
      setTimeout(() => {
        runOnJS(navigateToWelcome)();
      }, 1200);
    };

    init();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        {/* Your logo here */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbbf24", // amber-500
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
