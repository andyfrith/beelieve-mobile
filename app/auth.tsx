import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Auth() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       router.replace("/tabs");
  //     }, 1000);
  //   }, []);

  return (
    <LinearGradient colors={["#FFD700", "#FFA500"]}>
      <View>
        <MaterialCommunityIcons name="bee" size={100} color="white" />
      </View>
    </LinearGradient>
  );
}
