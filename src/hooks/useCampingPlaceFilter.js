import { useEffect, useState } from "react";

const useCampingPlaceFilter = (campingPlace) => {
  const [selectedFilter, setSelectedFilter] = useState("updatedAt");
  const [campingPlaceFiltered, setCampingPlaceFiltered] =
    useState(campingPlace);

  useEffect(() => {
    let campingPlaceSorted = [...campingPlace];
    if (selectedFilter === "updatedAt") {
      campingPlaceSorted.sort((a, b) => b.updatedAt - a.updatedAt);
    } else if (selectedFilter === "reservedDateCount") {
      campingPlaceSorted.sort(
        (a, b) => b.reservedDateCount - a.reservedDateCount
      );
    } else if (selectedFilter === "reviewCount") {
      campingPlaceSorted.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (selectedFilter === "averageGrade") {
      campingPlaceSorted.sort((a, b) => b.averageGrade - a.averageGrade);
    }
    setCampingPlaceFiltered(campingPlaceSorted);
  }, [selectedFilter, campingPlace]);
  return { selectedFilter, setSelectedFilter, campingPlaceFiltered };
};

export default useCampingPlaceFilter;
