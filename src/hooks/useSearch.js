import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAddr, setSelectedAddr] = useState("all-addr");

  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const searchSubmitHandle = async (e) => {
    e.preventDefault();

    if (!searchText.trim() && selectedAddr === "all-addr") {
      setError("검색어 또는 지역을 선택해주세요.");
      return;
    }

    if (searchText.trim() && !searchHistory.includes(searchText)) {
      const updatedHistory = [searchText, ...searchHistory];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    const params = {};

    if (searchText.trim()) {
      params.name = searchText;
    }

    if (selectedAddr !== "all-addr") {
      params.addr = selectedAddr;
    }

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await get(`camps?${queryString}`, customHeaders);
      setSearchResults(response.content);
      setError(null);
    } catch (err) {
      setError("데이터를 가져오는데 실패했습니다.");
    }

    setSearchText(""); // 검색어 필드를 초기화합니다.
  };

  const historyClickHandle = (item) => {
    setSearchText(item);
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
    selectedAddr,
    setSelectedAddr,
    searchSubmitHandle,
    historyClickHandle,
    historyItemDelete,
  };
};

export default useSearch;
