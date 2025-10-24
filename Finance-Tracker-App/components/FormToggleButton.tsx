import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

const HANDLE_SIZE = 30;
const CONTAINER_WIDTH = 80;
const PADDING = 6;

export default function FormToggleButton({ isLogin, onClick }: { isLogin: boolean, onClick: () => void }) {
  const translateX = useRef(new Animated.Value(isLogin ? 0 : CONTAINER_WIDTH - HANDLE_SIZE - PADDING*2)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isLogin ? 0 : CONTAINER_WIDTH - HANDLE_SIZE - PADDING*2,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [isLogin]);

  return (
    <Pressable onPress={onClick} style={styles.container}>
      <Animated.View
        style={[
          styles.handle,
          { transform: [{ translateX }] }
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: HANDLE_SIZE + PADDING*2,
    backgroundColor: "#333",
    borderRadius: 50,
    padding: PADDING,
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    bottom: 160,  // distance from bottom of the form
    right: 45,   // distance from right of the form
    zIndex: 10,  // make sure it’s above other elements
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    position: "absolute",
    width: CONTAINER_WIDTH - HANDLE_SIZE - PADDING*2,
    zIndex: 1,
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: "#f3f3f3",
    position: "absolute",
    top: PADDING,
    left: PADDING,
    zIndex: 2,
    shadowColor: "#11dfff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
});
