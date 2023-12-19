import React from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Stack} from "expo-router";

function Home() {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <Stack.Screen
        options={{
          headerTitle: "Home",
        }}
      />
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default Home;