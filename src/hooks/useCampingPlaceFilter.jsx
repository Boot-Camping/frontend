import { useEffect, useState } from "react";

const useCampingPlaceFilter = (campingPlace) => {
  const [selectedFilter, setSelectedFilter] = useState("reservation");
  const [campingPlaceFiltered, setCampingPlaceFiltered] =
    useState(campingPlace);

  useEffect(() => {
    let campingPlaceSorted = [...campingPlace];
    if (selectedFilter === "reservation") {
      campingPlaceSorted.sort((a, b) => b.reservations - a.reservations);
    } else if (selectedFilter === "review") {
      campingPlaceSorted.sort((a, b) => b.reviews - a.reviews);
    } else if (selectedFilter === "star") {
      campingPlaceSorted.sort((a, b) => b.rating - a.rating);
    }
    setCampingPlaceFiltered(campingPlaceSorted);
  }, [selectedFilter, campingPlace]);
  return { selectedFilter, setSelectedFilter, campingPlaceFiltered };
};

export default useCampingPlaceFilter;
