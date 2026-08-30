import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSignIn, useSSO } from "@clerk/expo";
import type { OAuthStrategy } from "@clerk/shared/types";
import { images } from "@/constants/images";
import { VerificationModal } from "@/components/VerificationModal";

function getErrorMessage(error: any): string {
  if (!error) return "An unexpected error occurred.";
  if (typeof error === "string") return error;
  if (Array.isArray(error?.errors) && error.errors.length > 0) {
    return (
      error.errors[0]?.longMessage ||
      error.errors[0]?.message ||
      "An unexpected error occurred."
    );
  }
  if (error.longMessage) return error.longMessage;
  if (error.message) return error.message;
  return "An unexpected error occurred.";
}

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFetching = fetchStatus === "fetching" || loading;

  const handleSignIn = async () => {
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      if (signIn.reset) {
        signIn.reset();
      }

      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });

      if (error) {
        setErrorMessage(getErrorMessage(error));
        setLoading(false);
        return;
      }

      setModalVisible(true);
    } catch (err: any) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    try {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        return {
          success: false,
          error: getErrorMessage(error),
        };
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize({
          navigate: () => {
            router.replace("/");
          },
        });

        if (finalizeError) {
          return {
            success: false,
            error: getErrorMessage(finalizeError),
          };
        }
      }

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: getErrorMessage(err),
      };
    }
  };

  const handleResendCode = async () => {
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });
      if (error) {
        return {
          success: false,
          error: getErrorMessage(error),
        };
      }
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: getErrorMessage(err),
      };
    }
  };

  const handleVerificationSuccess = () => {
    setModalVisible(false);
    router.replace("/");
  };

  const handleSocialAuth = async (strategy: OAuthStrategy) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (
        err?.code === "SIGN_IN_CANCELLED" ||
        err?.code === "-5" ||
        msg.includes("cancelled") ||
        msg.includes("Popup window was blocked") ||
        msg.includes("window.open()") ||
        msg.includes("dismissed")
      ) {
        return;
      }
      setErrorMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
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

        {/* Global Error Banner */}
        {errorMessage && (
          <View className="bg-[#FEE2E2] p-3 rounded-xl mb-3 border border-[#FCA5A5]">
            <Text className="font-poppins-medium text-xs text-[#DC2626] text-center">
              {errorMessage}
            </Text>
          </View>
        )}

        {/* Input Fields */}
        <View className="gap-3 mt-2">
          {/* Email Input Card */}
          <View style={styles.inputCard}>
            <Text className="font-poppins-regular text-xs text-text-secondary mb-1">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              editable={!isFetching}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* Sign In Primary Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSignIn}
          disabled={isFetching}
          className="w-full h-14 bg-lingua-deep-purple rounded-2xl items-center justify-center mt-5 shadow-sm"
        >
          {isFetching ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="font-poppins-semibold text-white text-[17px]">
              Sign In
            </Text>
          )}
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
            onPress={() => handleSocialAuth("oauth_google")}
            disabled={isFetching}
            style={styles.socialButton}
          >
            <Image
              source={images.google}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-semibold text-text-primary text-[15px]">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSocialAuth("oauth_facebook")}
            disabled={isFetching}
            style={styles.socialButton}
          >
            <Image
              source={images.facebook}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-semibold text-text-primary text-[15px]">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSocialAuth("oauth_apple")}
            disabled={isFetching}
            style={styles.socialButton}
          >
            <Image
              source={images.apple}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text className="font-poppins-semibold text-text-primary text-[15px]">
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
        onVerify={handleVerifyCode}
        onResend={handleResendCode}
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
    borderWidth: 0,
    outlineWidth: 0,
    backgroundColor: "transparent",
  },
  socialButton: {
    position: "relative",
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
    position: "absolute",
    left: 20,
    width: 22,
    height: 22,
  },
});
