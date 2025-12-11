import { Stack } from "expo-router";

const RootNav = () => {
  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootNav;
