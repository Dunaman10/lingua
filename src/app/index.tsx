import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppins-bold text-[32px] text-lingua-purple tracking-tight">
          Lingua
        </Text>
        <Link href="/onboarding" className="mt-2">
          <Text className="font-poppins-medium text-[16px] text-lingua-purple underline">
            Open Onboarding
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9FB",
  },
});
