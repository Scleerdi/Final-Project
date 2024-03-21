import amenityData from "../../data/amenities.json";

export const getAmenityById = (id) => {
  return amenityData.amenities.find((amenity) => amenity.id === id);
};
