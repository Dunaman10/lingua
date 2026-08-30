import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { VerificationModal } from "@/components/VerificationModal";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@gmail.com");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignIn = () => {
    setModalVisible(true);
  };

  const handleVerificationSuccess = () => {
    setModalVisible(false);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Back Navigation */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          {/* Left chevron */}
          <View style={styles.backChevron} />
        </TouchableOpacity>

        {/* Heading & Subtitle */}
        <View className="mt-2 mb-4">
          <Text className="font-poppins-bold text-[28px] leading-[36px] text-text-primary">
            Welcome back!
          </Text>
          <Text className="font-poppins-regular text-[15px] text-text-secondary mt-1">
            Continue your language journey today ✨
          </Text>
        </View>

        {/* Mascot Illustration */}
        <View className="items-center justify-center my-2">
          <Image
            source={images.mascotAuth}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>

        {/* Input Fields */}
        <View className="gap-3 mt-2">
          {/* Email Input Card (No Password Field for Sign In as requested) */}
          <View style={styles.inputCard}>
            <Text className="font-poppins-regular text-xs text-text-secondary mb-1">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* Sign In Primary Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSignIn}
          className="w-full h-14 bg-lingua-deep-purple rounded-2xl items-center justify-center mt-5 shadow-sm"
        >
          <Text className="font-poppins-semibold text-white text-[17px]">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Divider: or continue with */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="font-poppins-regular text-xs text-text-secondary px-3">
            or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Social Auth Buttons */}
        <View className="gap-3">
          {/* Google */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignIn}
            style={styles.socialButton}
          >
            <Image
              source={images.google}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-medium text-text-primary text-[15px] ml-3">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignIn}
            style={styles.socialButton}
          >
            <Image
              source={images.facebook}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-medium text-text-primary text-[15px] ml-3">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignIn}
            style={styles.socialButton}
          >
            <Image
              source={images.apple}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-medium text-text-primary text-[15px] ml-3">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Footer: Don't have an account? Sign up */}
        <View className="flex-row items-center justify-center mt-8 pb-4">
          <Text className="font-poppins-regular text-[14px] text-text-secondary">
            {"Don't have an account? "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/signup")}
          >
            <Text className="font-poppins-semibold text-[14px] text-lingua-deep-purple">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Verification Code Modal */}
      <VerificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={handleVerificationSuccess}
        email={email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  backChevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: "#0D132B",
    transform: [{ rotate: "45deg" }],
    marginLeft: 4,
  },
  mascotImage: {
    width: 170,
    height: 170,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#0D132B",
    padding: 0,
    margin: 0,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  socialIcon: {
    width: 22,
    height: 22,
  },
});
