import { useState } from "react";

export const useLoadMore = (initialVisibleItems, data) => {
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

  const loadMore = () => {
    setVisibleItems(
      (prevVisibleItems) => prevVisibleItems + initialVisibleItems
    );
  };

  const hasMoreItems = visibleItems < data.length;

  return { visibleItems, loadMore, hasMoreItems };
};
