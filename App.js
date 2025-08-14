import { useState, useEffect, useRef } from "react";
import useCustomFonts from "./useCustomFonts";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  console.log("S");
  
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const intervalRef = useRef(null);
  const fontsLoaded = useCustomFonts();

  // Start/stop effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Format time
  const formattedMin = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const formattedSec = (timeLeft % 60).toString().padStart(2, "0");

  // Handlers
  const handleStartStop = () => {
    if (timeLeft > 0) setIsRunning((prev) => !prev);
  };

  const handleAddMinute = () => {
    if (!isRunning) setTimeLeft((prev) => prev + 60);
  };

  const handleAddSecond = () => {
    if (!isRunning) setTimeLeft((prev) => prev + 1);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>Loading...</Text>
      </View>
    );
  }

    console.log("E");
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.display}>{`${formattedMin}:${formattedSec}`}</Text>

        <Pressable style={styles.btn3} onPress={handleReset}>
          <Text style={styles.btnContent}>R</Text>
        </Pressable>

        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleAddMinute}>
            <Text style={styles.btnContent}>MIN</Text>
          </Pressable>

          <Pressable style={styles.btn} onPress={handleAddSecond}>
            <Text style={styles.btnContent}>SEC</Text>
          </Pressable>

          <Pressable style={styles.btn2} onPress={handleStartStop}>
            <Text style={styles.btnContent}>ST/SP</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b6b6bff",
    justifyContent: "center",
  },

  body: {
    backgroundColor: "#ffffffff",
    borderRadius: 70,
    marginHorizontal: 15,
    shadowColor: "#464343ff",
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 0.5,
  },
  display: {
    fontFamily: "Sarpanch-Medium",
    fontSize: 100,
    textAlign: "center",
    backgroundColor: "#cadbd0ff",
    borderRadius: 40,
    marginHorizontal: 30,
    marginTop: 30,
  },
  btn: {
    backgroundColor: "#44f3ffff",
    padding: 8,
    height: 70,
    width: 70,
    justifyContent: "center",
    borderRadius: 35,
    shadowColor: "#606060ff",
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowRadius: 3,
    elevation: 3,
    shadowOpacity: 0.8,
  },
  btn2: {
    backgroundColor: "#44f3ffff",
    padding: 8,
    height: 80,
    width: 80,
    justifyContent: "center",
    borderRadius: 40,
    shadowColor: "#606060ff",
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowRadius: 3,
    elevation: 3,
    shadowOpacity: 0.8,
  },
  btnContent: {
    fontFamily: "Sarpanch-Medium",
    fontSize: 18,
    textAlign: "center",
  },
  btnContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  btn3: {
    backgroundColor: "#fa974cff",
    padding: 0,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12.5,
    marginLeft: 10,
    marginBottom: -25,
  },
});
