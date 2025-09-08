import { PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestMediaPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const permissionsToRequest: Array<keyof typeof PermissionsAndroid.PERMISSIONS> = Platform.Version >= 33 ? ['CAMERA', 'READ_MEDIA_IMAGES'] : ['CAMERA', 'READ_EXTERNAL_STORAGE'];
      const granted = await PermissionsAndroid.requestMultiple(permissionsToRequest.map(p => PermissionsAndroid.PERMISSIONS[p]));
      const allGranted = Object.values(granted).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
      return allGranted;
    }

    if (Platform.OS === 'ios') {
      const camera = await request(PERMISSIONS.IOS.CAMERA);
      const photos = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return camera === RESULTS.GRANTED && photos === RESULTS.GRANTED;
    }

    return false;
  } catch (error) {
    console.warn('Permission request error:', error);
    return false;
  }
};
