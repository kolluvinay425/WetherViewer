import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  background-color: #007bff;
  padding: 15px 20px;
  color: white;
  font-family: "Arial", sans-serif;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
`;

const LogoIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <LogoIcon
          src="https://cdn-icons-png.flaticon.com/512/9393/9393425.png"
          alt="Weather Logo"
        />
        WeatherApp
      </Logo>
    </NavbarContainer>
  );
};

export default Navbar;
