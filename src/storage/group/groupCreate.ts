import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage.config";

export async function groupCreate(newGroupName: string) {
  try {
    await AsyncStorage.setItem(GROUP_COLLECTION, newGroupName);
  } catch (error) {
    throw error;
  }
}
