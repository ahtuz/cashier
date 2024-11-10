import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { check, request, PERMISSIONS } from 'react-native-permissions';

const CameraPage = ({ navigation }) => {
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const requestCameraPermission = async () => {
      const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
      const microphoneStatus = await request(PERMISSIONS.IOS.MICROPHONE);

      if (cameraStatus !== 'granted' || microphoneStatus !== 'granted') {
        navigation.goBack();
      }
    };

    requestCameraPermission();
  }, []);

  if (device == null) return <View style={styles.loading} />;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraPage;