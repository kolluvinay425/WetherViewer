import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import AchievementItem from "./AchievementItem";

Modal.setAppElement("#root"); // Required for accessibility

const API_URL = "http://localhost:3001/api/achievements/all"; // Replace with your actual API URL

// Styled Components
const AchievementsListContainer = styled.div`
  padding: 20px;
  width: 70%;
  margin: 0 auto;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// AchievementItem Component

// Main Achievements List Component
const AchievementsList = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const achievementsResponse = await fetch(
          `${API_URL}?name=${searchText}`
        );
        const achievementsData = await achievementsResponse.json();
        setAchievements(achievementsData.achievements);
        console.log(achievementsData.achievements);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setIsUpdated(false);
      }
    };

    fetchData();
  }, [searchText, isUpdated]);

  const handleUpdate = () => {
    setIsUpdated(true);
  };

  // const toggleExpand = (index) => {
  //   setExpandedIndex(expandedIndex === index ? null : index);
  // };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      document.title = "Achievements"; // reset title when closing
    } else {
      setExpandedIndex(index);
      const title = achievements[index].name.en;
      console.log("---------------->", title);
      if (title) {
        document.title = title; // update browser tab title
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AchievementsListContainer>
      <SearchBarContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search achievements..."
        />
      </SearchBarContainer>

      {achievements?.map((item, index) => (
        <AchievementItem
          key={item.id}
          achievement={item}
          onClick={() => toggleExpand(index)}
          expanded={expandedIndex === index}
          requirements={item.requirements}
          tips={item.tipsTricks}
          handleUpdate={handleUpdate}
        />
      ))}
    </AchievementsListContainer>
  );
};

export default AchievementsList;
