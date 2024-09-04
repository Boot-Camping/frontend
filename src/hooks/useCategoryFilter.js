import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useCategoryFilter = (queryString, categoryTitle) => {
  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const CategoryFilter = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };
      try {
        const response = await get(`camps?${queryString}`, customHeaders);

        const categoryTitleFilter = response.content.filter(
          (campingPlace) =>
            categoryTitle === "전체" ||
            campingPlace.categories.includes(categoryTitle)
        );

        const sortedCampingPlaces = categoryTitleFilter.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setCampingPlaces(sortedCampingPlaces);
      } catch (error) {
        setError(error.message);
      }
    };

    CategoryFilter();
  }, [queryString, accessToken, categoryTitle]);

  return { campingPlaces, error };
};

export default useCategoryFilter;
