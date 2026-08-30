import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate back to home or next screen
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 justify-between px-6 pb-6">
        {/* Top Section */}
        <View>
          {/* Header Brand */}
          <View className="flex-row items-center justify-center pt-2 gap-2">
            <Image
              source={images.mascotLogo}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text className="font-poppins-bold text-2xl text-text-primary tracking-tight">
              lingua
            </Text>
          </View>

          {/* Heading & Subtitle */}
          <View className="mt-8 px-1">
            <Text className="font-poppins-bold text-[32px] leading-[38px] text-text-primary">
              Your AI language
            </Text>
            <Text className="font-poppins-bold text-[32px] leading-[38px] text-lingua-deep-purple">
              teacher<Text className="text-text-primary">.</Text>
            </Text>

            <Text className="font-poppins-regular text-[15px] leading-[22px] text-text-secondary mt-3">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>
        </View>

        {/* Center Mascot & Speech Bubbles */}
        <View className="items-center justify-center flex-1 my-2">
          <View style={styles.mascotContainer}>
            {/* Top-Left Speech Bubble: Hello! */}
            <View style={styles.bubbleHello}>
              <View className="bg-[#EBF3FD] px-4 py-2 rounded-2xl">
                <Text className="font-poppins-semibold text-[15px] text-text-primary">
                  Hello!
                </Text>
              </View>
              {/* Pointer / Tail */}
              <View style={styles.bubbleHelloTail} />
            </View>

            {/* Top-Right Speech Bubble: ¡Hola! */}
            <View style={styles.bubbleHola}>
              <View className="bg-[#F3EFFF] px-4 py-2 rounded-2xl">
                <Text className="font-poppins-semibold text-[15px] text-lingua-deep-purple">
                  ¡Hola!
                </Text>
              </View>
              {/* Pointer / Tail */}
              <View style={styles.bubbleHolaTail} />
            </View>

            {/* Middle-Right Speech Bubble: 你好! */}
            <View style={styles.bubbleNihao}>
              <View className="bg-[#FFF1EE] px-4 py-2 rounded-2xl">
                <Text className="font-poppins-semibold text-[15px] text-[#E84D38]">
                  你好!
                </Text>
              </View>
              {/* Pointer / Tail */}
              <View style={styles.bubbleNihaoTail} />
            </View>

            {/* Mascot Illustration */}
            <Image
              source={images.mascotWelcome}
              style={styles.mascotImage}
              resizeMode="contain"
            />
            {/* Subtle soft floor shadow */}
            <View style={styles.mascotShadow} />
          </View>
        </View>

        {/* Bottom CTA Section */}
        <View className="w-full">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleGetStarted}
            className="w-full h-14 bg-lingua-deep-purple rounded-2xl flex-row items-center justify-center relative px-6 shadow-sm"
          >
            <Text className="font-poppins-semibold text-white text-[17px]">
              Get Started
            </Text>

            {/* Right Chevron Icon */}
            <View className="absolute right-6 items-center justify-center">
              <View className="w-2.5 h-2.5 border-t-2 border-r-2 border-white rotate-45" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  mascotContainer: {
    width: 280,
    height: 290,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  mascotImage: {
    width: 260,
    height: 270,
  },
  mascotShadow: {
    width: 170,
    height: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 999,
    marginTop: -8,
  },
  bubbleHello: {
    position: "absolute",
    top: 14,
    left: -4,
    zIndex: 10,
  },
  bubbleHelloTail: {
    position: "absolute",
    bottom: -4,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: "#EBF3FD",
    transform: [{ rotate: "45deg" }],
  },
  bubbleHola: {
    position: "absolute",
    top: 10,
    right: 6,
    zIndex: 10,
  },
  bubbleHolaTail: {
    position: "absolute",
    bottom: -4,
    left: 14,
    width: 10,
    height: 10,
    backgroundColor: "#F3EFFF",
    transform: [{ rotate: "45deg" }],
  },
  bubbleNihao: {
    position: "absolute",
    top: 98,
    right: -10,
    zIndex: 10,
  },
  bubbleNihaoTail: {
    position: "absolute",
    bottom: -4,
    left: 14,
    width: 10,
    height: 10,
    backgroundColor: "#FFF1EE",
    transform: [{ rotate: "45deg" }],
  },
});
