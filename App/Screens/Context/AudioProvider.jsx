import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    getPermission();
  }, []);

  const permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "This app needs your permission to read your audio files",
      [
        { text: "Allow", onPress: () => getPermission() },
        { text: "Deny", onPress: () => permissionAlert() },
      ]
    );
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    setAudioFiles(media.assets);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    } else if (!permission.granted && permission.canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        getAudioFiles();
      } else if (status === "denied") {
        permissionAlert();
      }
    } else {
      permissionAlert();
    }
  };

  return (
    <AudioContext.Provider value={{ audioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
