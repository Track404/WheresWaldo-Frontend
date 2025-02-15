import axiosInstance from './axiosInstance';

export const getMap = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    if (!id) throw new Error('Missing mapId');
    const response = await axiosInstance.get(`/map/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createMap = async (mapData) => {
  try {
    const response = await axiosInstance.post(`/map`, mapData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
