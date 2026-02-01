import { View } from "react-native";

import { PacmanIndicator } from "react-native-indicators";
const Loading = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <PacmanIndicator {...props} />
    </View>
  );
};

export default Loading;
