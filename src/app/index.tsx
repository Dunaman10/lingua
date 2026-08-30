import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Brand Section */}
        <View className="items-center py-6 border-b border-border mb-6">
          <View className="flex-row items-center gap-3">
            <Image
              source={images.mascotLogo}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <Text className="typography-h1 text-text-primary font-bold">lingua</Text>
          </View>
          <Text className="typography-caption text-text-secondary mt-1 tracking-wider uppercase">
            Design System & Theme
          </Text>
        </View>

        {/* Brand Showcase Card */}
        <View className="bg-surface rounded-2xl p-5 border border-border mb-6">
          <Text className="typography-caption text-lingua-purple font-semibold uppercase tracking-wider mb-3">
            BRAND
          </Text>
          <View className="flex-row items-center justify-center py-4 bg-white rounded-xl border border-border gap-4">
            <Image
              source={images.mascotLogo}
              className="w-20 h-20"
              resizeMode="contain"
            />
            <Text className="text-4xl font-bold text-text-primary tracking-tight font-poppins-bold">
              lingua
            </Text>
          </View>
        </View>

        {/* Colors Section */}
        <View className="bg-surface rounded-2xl p-5 border border-border mb-6">
          <Text className="typography-caption text-lingua-purple font-semibold uppercase tracking-wider mb-4">
            COLORS
          </Text>

          {/* Primary Colors */}
          <Text className="typography-caption text-text-secondary uppercase tracking-wider mb-3 font-semibold">
            PRIMARY
          </Text>
          <View className="flex-row flex-wrap justify-between mb-5 gap-y-3">
            <View className="w-[48%] items-center bg-white p-3 rounded-xl border border-border">
              <View className="w-full h-14 rounded-lg bg-lingua-purple mb-2" />
              <Text className="text-xs font-semibold text-text-primary font-poppins-semibold text-center">
                LINGUA PURPLE
              </Text>
              <Text className="text-[11px] text-text-secondary font-poppins-regular">
                #6C4EF5
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-3 rounded-xl border border-border">
              <View className="w-full h-14 rounded-lg bg-lingua-deep-purple mb-2" />
              <Text className="text-xs font-semibold text-text-primary font-poppins-semibold text-center">
                LINGUA DEEP PURPLE
              </Text>
              <Text className="text-[11px] text-text-secondary font-poppins-regular">
                #5B3BF6
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-3 rounded-xl border border-border">
              <View className="w-full h-14 rounded-lg bg-lingua-blue mb-2" />
              <Text className="text-xs font-semibold text-text-primary font-poppins-semibold text-center">
                LINGUA BLUE
              </Text>
              <Text className="text-[11px] text-text-secondary font-poppins-regular">
                #4D8BFF
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-3 rounded-xl border border-border">
              <View className="w-full h-14 rounded-lg bg-lingua-green mb-2" />
              <Text className="text-xs font-semibold text-text-primary font-poppins-semibold text-center">
                LINGUA GREEN
              </Text>
              <Text className="text-[11px] text-text-secondary font-poppins-regular">
                #21C16B
              </Text>
            </View>
          </View>

          {/* Semantic Colors */}
          <Text className="typography-caption text-text-secondary uppercase tracking-wider mb-3 font-semibold">
            SEMANTIC
          </Text>
          <View className="flex-row flex-wrap justify-between mb-5 gap-y-3">
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-success mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                SUCCESS
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #21C16B
              </Text>
            </View>
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-warning mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                WARNING
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #FFC800
              </Text>
            </View>
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-streak mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                STREAK
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #FF8A00
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-error mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                ERROR
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #FF4D4F
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-info mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                INFO
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #4D8BFF
              </Text>
            </View>
          </View>

          {/* Neutrals */}
          <Text className="typography-caption text-text-secondary uppercase tracking-wider mb-3 font-semibold">
            NEUTRALS
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-text-primary mb-2" />
              <Text className="text-[10px] font-semibold text-text-primary font-poppins-semibold text-center">
                TEXT PRIMARY
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #0D132B
              </Text>
            </View>
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-text-secondary mb-2" />
              <Text className="text-[10px] font-semibold text-text-primary font-poppins-semibold text-center">
                TEXT SECONDARY
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #6B7280
              </Text>
            </View>
            <View className="w-[31%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-border mb-2" />
              <Text className="text-[10px] font-semibold text-text-primary font-poppins-semibold text-center">
                BORDER
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #E5E7EB
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-surface border border-border mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                SURFACE
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #F6F7FB
              </Text>
            </View>
            <View className="w-[48%] items-center bg-white p-2.5 rounded-xl border border-border">
              <View className="w-full h-10 rounded-lg bg-background border border-border mb-2" />
              <Text className="text-[11px] font-semibold text-text-primary font-poppins-semibold text-center">
                BACKGROUND
              </Text>
              <Text className="text-[10px] text-text-secondary font-poppins-regular">
                #FFFFFF
              </Text>
            </View>
          </View>
        </View>

        {/* Typography Section */}
        <View className="bg-surface rounded-2xl p-5 border border-border mb-6">
          <Text className="typography-caption text-lingua-purple font-semibold uppercase tracking-wider mb-2">
            TYPOGRAPHY
          </Text>
          <Text className="typography-caption text-text-secondary uppercase tracking-wider mb-1">
            FONT FAMILY
          </Text>
          <Text className="text-3xl font-bold text-text-primary font-poppins-bold mb-2">
            Poppins
          </Text>
          <Text className="typography-body-sm text-text-secondary mb-6">
            Poppins is a modern, geometric sans-serif typeface that provides excellent
            readability and a friendly personality.
          </Text>

          {/* Typography Scale Table */}
          <View className="bg-white rounded-xl p-4 border border-border gap-y-4">
            {/* H1 */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-h1">H1</Text>
                <Text className="typography-caption text-text-secondary">
                  32px · Bold · 1.2
                </Text>
              </View>
              <Text className="typography-body-sm text-text-secondary">
                Page / Screen Title
              </Text>
            </View>

            {/* H2 */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-h2">H2</Text>
                <Text className="typography-caption text-text-secondary">
                  24px · SemiBold · 1.3
                </Text>
              </View>
              <Text className="typography-body-sm text-text-secondary">
                Section Title
              </Text>
            </View>

            {/* H3 */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-h3">H3</Text>
                <Text className="typography-caption text-text-secondary">
                  20px · SemiBold · 1.3
                </Text>
              </View>
              <Text className="typography-body-sm text-text-secondary">
                Card / Module Title
              </Text>
            </View>

            {/* H4 */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-h4">H4</Text>
                <Text className="typography-caption text-text-secondary">
                  16px · Medium · 1.4
                </Text>
              </View>
              <Text className="typography-body-sm text-text-secondary">
                Subheading
              </Text>
            </View>

            {/* Body Large */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-body-lg font-semibold">Body Large</Text>
                <Text className="typography-caption text-text-secondary">
                  16px · Regular · 1.6
                </Text>
              </View>
              <Text className="typography-body-lg text-text-primary">
                Important content
              </Text>
            </View>

            {/* Body Medium */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-body-md font-semibold">Body Medium</Text>
                <Text className="typography-caption text-text-secondary">
                  14px · Regular · 1.6
                </Text>
              </View>
              <Text className="typography-body-md text-text-primary">
                Body text
              </Text>
            </View>

            {/* Body Small */}
            <View className="border-b border-border pb-3">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-body-sm font-semibold">Body Small</Text>
                <Text className="typography-caption text-text-secondary">
                  13px · Regular · 1.6
                </Text>
              </View>
              <Text className="typography-body-sm text-text-secondary">
                Supporting text
              </Text>
            </View>

            {/* Caption */}
            <View>
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="typography-caption font-semibold">Caption</Text>
                <Text className="typography-caption text-text-secondary">
                  11px · Regular · 1.4
                </Text>
              </View>
              <Text className="typography-caption text-text-secondary">
                Labels, meta text
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
