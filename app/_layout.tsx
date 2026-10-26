
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Colors from "../src/constants/colors";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sos" />
        <Stack.Screen name="vehicle" />
        <Stack.Screen name="garages" />
        <Stack.Screen name="bookings" />
      </Stack>
    </>
  );
}
