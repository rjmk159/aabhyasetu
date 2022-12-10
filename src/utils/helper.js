import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAUTH = async () => {
  const token = await AsyncStorage.getItem('LOGIN_JWT_CREDS');
  return token;
};
export const checkGRADE = async () => {
  const token = await AsyncStorage.getItem('AB_GRADE');
  return token;
};

// export const checkLANGUAGE = async () => {
//   const token = await AsyncStorage.getItem('AB_LANGUAGE');
//   return token;
// };
// export const saveGRADE = async (value) => {
//   await AsyncStorage.setItem('AB_GRADE', value);
// };
export const saveLANGUAGE = async (value) => {
  await AsyncStorage.setItem('AB_LANGUAGE', value);
};
export const _removeData = async () => {
  try {
    await AsyncStorage.removeItem('LOGIN_JWT_CREDS');
  } catch (error) {
  }
};
