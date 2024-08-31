import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const searchSubmitHandle = async (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    if (!searchHistory.includes(searchText)) {
      const updatedHistory = [searchText, ...searchHistory];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    const params = {
      name: searchText,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await get(`camps?${queryString}`, customHeaders);
      setSearchResults(response.content);
      setError(null);
    } catch (err) {
      setError("데이터를 가져오는데 실패했습니다.");
    }
    setSearchText("");
  };

  const historyItemDelete = (itemToDelete) => {
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToDelete
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return {
    searchText,
    setSearchText,
    searchHistory,
    searchResults,
    error,
    searchSubmitHandle,
    historyItemDelete,
  };
};

export default useSearch;
