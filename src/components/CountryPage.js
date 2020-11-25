import React, { useState, useEffect } from "react";
import BackDropSpinner from "./BackDropSinner";
import { Link, useLocation, Redirect } from "react-router-dom";
import { addCommas, format } from "../utils";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 60px;
  @media screen and (max-width: 750px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 150px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme.color === "dark" ? "#2B3743" : "#FFFFFF"};
  color: ${(props) => (props.theme.color === "dark" ? "#E7EDF0" : "#1C1D1F")};
  padding: 15px;
  outline: none;
  border: none;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
`;

const DescriptionWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const BannerWrapper = styled.div`
  max-width: 450px;
  max-height: 350px;
`;

const Flag = styled.img`
  width: 100%;
  max-height: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1080px) {
    width: 100%;
    max-width: 450px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InfoLeft = styled.div`
  max-width: 250px;
  @media screen and (max-width: 980px) {
    margin-top: 20px;
    max-width: 100%;
  }
`;

const InfoRight = styled.div`
  max-width: 250px;
  @media screen and (max-width: 980px) {
    margin-top: 20px;
    max-width: 100%;
  }
`;

const Bold = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-inline-start: 0px;
  padding-inline-end: 40px;
`;

const BordersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  @media screen and (max-width: 980px) {
    flex-direction: column;
  }
`;

const BorderButtonsWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  @media screen and (max-width: 980px) {
    width: 100%;
  }
`;

const BorderButton = styled(Button)`
  align-items: center;
  margin-left: 3px;
  margin-right: 3px;
  width: 120px;
  max-height: 50px;
  padding: 5px;
  margin-top: 0;
  margin-bottom: 5px;
`;

const fetchBorder = async (b) => {
  const url = "https://restcountries.eu/rest/v2/alpha/";
  const data = await fetch(url + b);
  const json = await data.json();
  return json;
};

const initialState = [];

export default function CountryPage() {
  const { state } = useLocation();
  const [countries, setCountries] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (state) {
      Promise.all(state.country.borders.map((b) => fetchBorder(b))).then(
        (r) => {
          setTimeout(() => {
            setCountries(r);
            setLoading(false);
          }, 400);
        }
      );
    }
  }, [state]);

  if (!state) {
    return <Redirect to="/"></Redirect>;
  }

  if (loading) {
      return <BackDropSpinner color="red" size={100}/>
  }

  const {
    country: {
      flag,
      name,
      nativeName,
      subRegion,
      topLevelDomain,
      currencies,
      languages,
      population,
      region,
      capital,
    } = {},
  } = state;

  const parsedCurrencies = addCommas(currencies);
  const parsedLanguages = addCommas(languages);
  
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Button className="shadow">
            <div>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div>
              <span>Back</span>
            </div>
          </Button>
        </Link>
        <DescriptionWrapper>
          <BannerWrapper>
            <Flag src={flag} alt="flag"></Flag>
          </BannerWrapper>
          <InfoContainer>
            <h2>{name}</h2>
            <InfoWrapper>
              <InfoLeft>
                <List>
                  <li>
                    {" "}
                    <Bold>Native name: </Bold>
                    <span>{nativeName}</span>
                  </li>
                  <li>
                    {" "}
                    <Bold>Population: </Bold>
                    <span>{format(population)}</span>
                  </li>
                  <li>
                    {" "}
                    <Bold>Region: </Bold>
                    <span>{region}</span>
                  </li>
                  <li>
                    {" "}
                    <Bold>Sub Region: </Bold>
                    <span>{subRegion}</span>
                  </li>
                  <li>
                    {" "}
                    <Bold>Capital: </Bold>
                    <span>{capital}</span>
                  </li>
                </List>
              </InfoLeft>
              <InfoRight>
                <List>
                  <li>
                    <Bold>Top Level Domain: </Bold>
                    <span>{topLevelDomain}</span>
                  </li>
                  <li>
                    <Bold>Currencies: </Bold>
                    {parsedCurrencies}
                  </li>
                  <li>
                    <Bold>Languages: </Bold>
                    {parsedLanguages}
                  </li>
                  <li></li>
                </List>
              </InfoRight>
            </InfoWrapper>
            <BordersWrapper>
              <Bold>Border Countries: </Bold>
              <BorderButtonsWrapper>
                {countries.map((country, index) => (
                  <Link
                    key={index}
                    to={{
                      pathname: `/country/${country.name}`,
                      state: {
                        country,
                      },
                    }}
                  >
                    <BorderButton className="shadow">
                      {country.name}
                    </BorderButton>
                  </Link>
                ))}
              </BorderButtonsWrapper>
            </BordersWrapper>
          </InfoContainer>
        </DescriptionWrapper>
      </Wrapper>
    </Container>
  );
}
