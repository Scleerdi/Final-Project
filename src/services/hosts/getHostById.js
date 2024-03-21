import hostData from "../../data/hosts.json";

export const gethostById = (id) => {
  return hostData.hosts.find((host) => host.id === id);
};
