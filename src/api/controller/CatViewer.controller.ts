import { api_ } from "@api";

export const getCatImages = async ({ limit }: { limit: number }) => {
  return await api_.get(`/search?limit=${limit}`);
};
