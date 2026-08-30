import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SymbolView } from "expo-symbols";

interface EyeIconProps {
  visible: boolean;
  size?: number;
  color?: string;
}

export function EyeIcon({
  visible,
  size = 20,
  color = "#6B7280",
}: EyeIconProps) {
  if (Platform.OS === "ios") {
    return (
      <SymbolView
        name={visible ? "eye" : "eye.slash"}
        size={size}
        tintColor={color}
      />
    );
  }

  if (visible) {
    return (
      <View style={[styles.container, { width: size + 4, height: size }]}>
        <View
          style={[
            styles.eyeAlmond,
            {
              borderColor: color,
              width: size + 2,
              height: size * 0.72,
            },
          ]}
        >
          <View
            style={[
              styles.pupil,
              {
                width: size * 0.36,
                height: size * 0.36,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size + 4, height: size }]}>
      <View
        style={[
          styles.eyeAlmond,
          {
            borderColor: color,
            width: size + 2,
            height: size * 0.72,
            opacity: 0.85,
          },
        ]}
      >
        <View
          style={[
            styles.pupil,
            {
              width: size * 0.34,
              height: size * 0.34,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View
        style={[
          styles.slash,
          {
            backgroundColor: color,
            width: size + 4,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  eyeAlmond: {
    borderWidth: 1.8,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  pupil: {
    borderRadius: 999,
  },
  slash: {
    position: "absolute",
    height: 1.8,
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }],
  },
});
