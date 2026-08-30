import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onVerify?: (code: string) => Promise<{ success: boolean; error?: string }>;
  onResend?: () => Promise<{ success: boolean; error?: string }>;
  email?: string;
}

export function VerificationModal({
  visible,
  onClose,
  onSuccess,
  onVerify,
  onResend,
  email = "alex@gmail.com",
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setCode(["", "", "", "", "", ""]);
        setErrorMessage(null);
        setResendStatus(null);
        setLoading(false);
        inputRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const submitCode = async (fullCode: string) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      if (onVerify) {
        const result = await onVerify(fullCode);
        if (result.success) {
          onSuccess();
        } else {
          setErrorMessage(result.error || "Invalid verification code");
          setCode(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (text: string, index: number) => {
    setErrorMessage(null);
    const cleanText = text.replace(/[^0-9]/g, "");

    // Handle paste of complete 6-digit code or partial
    if (cleanText.length > 1) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = cleanText[i] || "";
      }
      setCode(newCode);
      const nextIndex = Math.min(cleanText.length, 5);
      inputRefs.current[nextIndex]?.focus();

      if (cleanText.length >= 6) {
        submitCode(newCode.join(""));
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    // If a digit is entered, move to the next input
    if (cleanText.length === 1) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        // Check if all 6 digits are filled
        const isComplete = newCode.every((digit) => digit.length === 1);
        if (isComplete) {
          submitCode(newCode.join(""));
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (!onResend || loading) return;
    setErrorMessage(null);
    setResendStatus("Sending...");
    try {
      const res = await onResend();
      if (res.success) {
        setResendStatus("Code resent successfully!");
        setTimeout(() => setResendStatus(null), 3000);
      } else {
        setResendStatus(null);
        setErrorMessage(res.error || "Failed to resend code");
      }
    } catch (err: any) {
      setResendStatus(null);
      setErrorMessage(err?.message || "Failed to resend code");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Close Button Top Right */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Icon / Badge */}
          <View className="w-14 h-14 rounded-2xl bg-[#F3EFFF] items-center justify-center mb-4">
            <Text className="text-2xl">✉️</Text>
          </View>

          {/* Heading */}
          <Text className="font-poppins-bold text-2xl text-text-primary text-center">
            Verify your email
          </Text>

          {/* Subtitle */}
          <Text className="font-poppins-regular text-sm text-text-secondary text-center mt-2 px-2 leading-5">
            We sent a 6-digit verification code to{"\n"}
            <Text className="font-poppins-semibold text-text-primary">
              {email || "your email"}
            </Text>
          </Text>

          {/* 6 Digit Inputs */}
          <View style={styles.inputsRow}>
            {code.map((digit, index) => {
              const isFilled = digit.length > 0;
              return (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                  editable={!loading}
                  underlineColorAndroid="transparent"
                  style={[
                    styles.codeInput,
                    isFilled && styles.codeInputFilled,
                    errorMessage ? styles.codeInputError : null,
                  ]}
                />
              );
            })}
          </View>

          {/* Loading Indicator */}
          {loading && (
            <View className="mt-4 flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#6C4EF5" />
              <Text className="font-poppins-regular text-xs text-text-secondary">
                Verifying code...
              </Text>
            </View>
          )}

          {/* Error Message */}
          {errorMessage && !loading && (
            <Text className="font-poppins-medium text-xs text-[#DC2626] text-center mt-3 px-2">
              {errorMessage}
            </Text>
          )}

          {/* Resend Status Notification */}
          {resendStatus && (
            <Text className="font-poppins-medium text-xs text-lingua-deep-purple text-center mt-3">
              {resendStatus}
            </Text>
          )}

          {/* Resend Code Action */}
          <View className="flex-row items-center justify-center mt-6">
            <Text className="font-poppins-regular text-xs text-text-secondary">
              {"Didn't receive the code? "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleResend}
              disabled={loading}
            >
              <Text className="font-poppins-semibold text-xs text-lingua-deep-purple">
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: "center",
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  closeButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 16,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 24,
    gap: 6,
  },
  codeInput: {
    flex: 1,
    minWidth: 0,
    maxWidth: 48,
    height: 52,
    backgroundColor: "#F6F7FB",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#0D132B",
    textAlign: "center",
    padding: 0,
    margin: 0,
    outlineWidth: 0,
  },
  codeInputFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FFFFFF",
  },
  codeInputError: {
    borderColor: "#DC2626",
  },
});
