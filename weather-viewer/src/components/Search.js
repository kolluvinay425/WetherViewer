import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CityInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  width: 250px;
  margin-right: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const Search = ({ city, setCity, fetchWeather }) => {
  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    } else {
      alert("enter city name please");
    }
  };

  return (
    <SearchContainer>
      <CityInput
        type="text"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default Search;
