import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "../utils";

const CardWrapper = styled.div`
  width: 100%;
  max-width: 250px;
  margin-bottom: 85px;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.1);
  }
`;

const BannerWrapper = styled.div`
  max-width: 250px;
  height: 150px;
`;

const Banner = styled.img`
  position: static;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  background-color: ${(props) =>
    props.theme.color === "dark" ? "#2B3743" : "#FFFFFF"};
  max-width: 250px;
  padding: 15px;
  padding-bottom: 40px;
`;

const Bold = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const CardTitle = styled.span`
  display: block;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const InfoDiv = styled.div`
  font-size: 14px;
`;

export default function CountryCard({ country }) {
  const { flag, name, population, region, capital } = country;

  return (
    <CardWrapper className="shadow">
      <BannerWrapper>
        <Link to={{
          pathname: `/country/${name}`,
          state: {
            country
          } 
        }}>
          <Banner src={flag} alt="banner" className="shadow"></Banner>
        </Link>
      </BannerWrapper>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <InfoDiv>
          <Bold>Population:</Bold>
          <span>{format(population)}</span>
        </InfoDiv>
        <InfoDiv>
          <Bold>Region:</Bold>
          <span>{region}</span>
        </InfoDiv>
        <InfoDiv>
          <Bold>Capital:</Bold>
          <span>{capital}</span>
        </InfoDiv>
      </CardBody>
    </CardWrapper>
  );
}
