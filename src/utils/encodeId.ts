export const encodeId = (id: number | string) => {
  return btoa(String(id));
};

export const decodeId = (hash: string) => {
  return Number(atob(hash));
};