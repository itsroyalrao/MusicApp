import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { AudioContext } from "../Context/AudioProvider";
import PlayerBar from "../Helper/PlayerBar";

export default function HomeScreen() {
  const { audioFiles } = useContext(AudioContext);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUri, setCurrentUri] = useState(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0); // New state to track audio position

  useEffect(() => {
    const updateAudioPosition = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        setAudioPosition(status.positionMillis);
      }
    };
    const interval = setInterval(updateAudioPosition, 100);

    return () => clearInterval(interval);
  }, [sound]);

  const handlePress = async (uri, index) => {
    try {
      if (currentUri === uri && sound && isPlaying) {
        await sound.stopAsync();
        setIsPlaying(false);
      } else {
        if (sound) {
          await sound.stopAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
        setCurrentUri(uri);
        setCurrentPlayingIndex(index);
      }
    } catch (error) {
      console.error("Failed to load/play the sound", error);
    }
  };

  const handlePause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    // Implement logic to play the previous track
  };

  const handleNext = () => {
    // Implement logic to play the next track
  };

  const handleSeek = async (position) => {
    if (sound) {
      await sound.setPositionAsync(position * 1000);
      setAudioPosition(position);
    }
    // console.log("position", position);
  };

  return (
    <View style={styles.body}>
      <ScrollView contentContainerStyle={styles.content}>
        {audioFiles.map((file, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(file.uri, index)}
          >
            <View style={styles.content_card}>
              <Image
                source={require("../../../assets/Images/songImg.png")}
                style={styles.content_card_image}
              />
              <View style={styles.content_card_text_area}>
                <Text
                  style={[
                    styles.content_card_text,
                    currentPlayingIndex === index && styles.changeTextColor,
                  ]}
                  numberOfLines={1}
                >
                  {file.filename}
                </Text>
                <Text style={styles.content_card_text} numberOfLines={1}>
                  {Math.floor(file.duration / 60)}min{" "}
                  {Math.floor(
                    file.duration - 60 * Math.floor(file.duration / 60)
                  )}
                  sec
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <PlayerBar
        audioFiles={audioFiles}
        currentPlayingIndex={currentPlayingIndex}
        isPlaying={isPlaying}
        onPause={handlePause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        audioPosition={audioPosition} // Pass audio position to PlayerBar
        setAudioPosition={setAudioPosition} // Pass audio position to PlayerBar
        onSeek={handleSeek} // Pass seek function to PlayerBar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    flex: 1,
  },
  content: {
    gap: 12,
    paddingHorizontal: 16,
  },
  content_card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  content_card_image: {
    width: 72,
    height: 72,
    marginRight: 10,
  },
  content_card_text_area: {
    flex: 1,
    paddingVertical: 4,
    paddingStart: 9,
  },
  content_card_text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    overflow: "hidden",
  },
  changeTextColor: {
    color: "red",
  },
});
