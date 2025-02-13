import axiosInstance from './axiosInstance';

export const getCharacter = async (characterId) => {
  try {
    const response = await axiosInstance.get(`/character/${characterId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const postCharacter = async (characterData) => {
  try {
    const response = await axiosInstance.get(`/character`, characterData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMapCharacter = async (mapId) => {
  try {
    const response = await axiosInstance.get(`/map/${mapId}/character`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
