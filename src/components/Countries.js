import React, { useContext } from "react";
import { CountriesContext } from "../context/context-countries";
import CountryCard from "./CountryCard";
import styled from "styled-components";

const Container = styled.div`
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 40px;
  }
  @media screen and (max-width: 581px) {
    justify-content: center;
  }
`;

const hasFiltered = (countries, byRegion, byName) => {
  const filterRegion = byRegion
    ? countries.filter((c) => c.region === byRegion)
    : countries;
  return byName
    ? filterRegion.filter((c) =>
        c.name.toLowerCase().includes(byName.toLowerCase())
      )
    : filterRegion;
};

const Countries = React.memo(({ byRegion, byName }) => {
  const {countries}= useContext(CountriesContext);
  const filtered =
    byRegion || byName ? hasFiltered(countries, byRegion, byName) : countries;

  return (
    <div>
      <Container>
        {filtered.map((c, index) => (
          <CountryCard key={index} country={c}></CountryCard>
        ))}
      </Container>
    </div>
  );
});

export default Countries;
