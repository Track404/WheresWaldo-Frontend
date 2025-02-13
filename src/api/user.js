import axiosInstance from './axiosInstance';

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const postUser = async ({ mapId, userData }) => {
  try {
    const response = await axiosInstance.post(`/map/${mapId}/user`, userData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMapUsers = async ({ queryKey }) => {
  try {
    const [_key, id] = queryKey;
    if (!id) throw new Error('Missing mapId');
    const response = await axiosInstance.get(`/map/${id}/user`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
