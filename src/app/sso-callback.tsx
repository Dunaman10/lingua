import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function SSOCallbackScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      router.replace(isSignedIn ? "/" : "/signin");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
