import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome as Icons } from "@expo/vector-icons";

const PlayerBar = ({
  audioFiles,
  currentPlayingIndex,
  isPlaying,
  onPause,
  onPrevious,
  onNext,
  audioPosition, // New prop for the current audio position
  setAudioPosition,
  onSeek, // New prop for seeking the audio
}) => {
  const currentFile = audioFiles[currentPlayingIndex];
  // State to track slider value
  const [sliderValue, setSliderValue] = useState(0);

  // Update slider value when audio position changes
  useEffect(() => {
    console.log("sliderValue", sliderValue);
    setSliderValue(audioPosition);
  }, [audioPosition]);

  // Function to handle sliding
  const handleSliderChange = (value) => {
    setSliderValue(value);
    setAudioPosition(value);
    // Seek to the desired position when sliding the slider
    onSeek(value);
  };

  if (!currentFile) {
    return null;
  }

  return (
    <View style={styles.playerBar}>
      <Image
        source={require("../../../assets/Images/songImg.png")}
        style={styles.playerBarImage}
      />
      <View style={styles.playerBarText}>
        <Text style={styles.playerBarTitle}>{currentFile.filename}</Text>
        <View style={styles.playerBarControls}>
          <TouchableOpacity onPress={onPrevious}>
            <Text style={styles.playerBarButton}>
              <Icons name="backward" size={20} color={"whitesmoke"} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPause}>
            <Text style={styles.playerBarButton}>
              {isPlaying ? (
                <Icons name="pause" size={20} color={"whitesmoke"} />
              ) : (
                <Icons name="play" size={20} color={"whitesmoke"} />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <Icons name="forward" size={20} color={"whitesmoke"} />
          </TouchableOpacity>
        </View>
        {/* Slider Component */}
        <Slider
          style={{ width: "100%", marginTop: 10 }}
          minimumValue={0}
          maximumValue={currentFile.duration} // Set maximum value to the duration of the audio file
          value={sliderValue}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="white"
          maximumTrackTintColor="grey"
          thumbTintColor="white"
        />
      </View>
    </View>
  );
};

export default PlayerBar;

const styles = StyleSheet.create({
  playerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  playerBarImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  playerBarText: {
    flex: 1,
  },
  playerBarTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  playerBarControls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playerBarButton: {
    color: "white",
    fontSize: 14,
  },
});
