import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useAuth, useUser, useClerk } from "@clerk/expo";
import { images } from "@/constants/images";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/onboarding");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const displayName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Friend";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 justify-between px-6 py-6">
        {/* Top Header */}
        <View>
          <View className="flex-row items-center justify-between pt-2">
            <View className="flex-row items-center gap-2">
              <Image
                source={images.mascotLogo}
                style={styles.headerLogo}
                resizeMode="contain"
              />
              <Text className="font-poppins-bold text-2xl text-text-primary tracking-tight">
                lingua
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSignOut}
              style={styles.signOutButton}
            >
              <Text className="font-poppins-medium text-xs text-[#DC2626]">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>

          {/* Welcome Card */}
          <View className="mt-8 bg-white p-6 rounded-3xl border-[1.5px] border-border shadow-sm">
            <Text className="font-poppins-regular text-sm text-text-secondary">
              Welcome back,
            </Text>
            <Text className="font-poppins-bold text-[26px] text-text-primary mt-1">
              {displayName} 👋
            </Text>
            <Text className="font-poppins-regular text-xs text-text-secondary mt-1">
              {user?.primaryEmailAddress?.emailAddress}
            </Text>

            <View className="mt-4 pt-4 border-t border-[#F3F4F6] flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-xl">🔥</Text>
                <View>
                  <Text className="font-poppins-bold text-sm text-text-primary">
                    1 Day Streak
                  </Text>
                  <Text className="font-poppins-regular text-[11px] text-text-secondary">
                    Start learning to build streak
                  </Text>
                </View>
              </View>

              <View className="bg-[#F3EFFF] px-3 py-1.5 rounded-full">
                <Text className="font-poppins-semibold text-xs text-lingua-deep-purple">
                  0 XP
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mascot Center Illustration */}
        <View className="items-center justify-center my-4">
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-xl text-text-primary text-center mt-2">
            Ready to learn?
          </Text>
          <Text className="font-poppins-regular text-sm text-text-secondary text-center mt-1 px-4">
            Explore interactive AI-guided lessons and practice real-world conversations!
          </Text>
        </View>

        {/* Start Learning Action */}
        <View className="w-full">
          <TouchableOpacity
            activeOpacity={0.85}
            className="w-full h-14 bg-lingua-deep-purple rounded-2xl flex-row items-center justify-center px-6 shadow-sm"
          >
            <Text className="font-poppins-semibold text-white text-[17px]">
              Start Lesson
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9FB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  signOutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
  },
  mascotImage: {
    width: 220,
    height: 220,
  },
});
