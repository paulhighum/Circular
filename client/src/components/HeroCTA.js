import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';

import AutoSuggestInput from './AutoSuggestInput';

import PrimaryBtn from './Styled/PrimaryBtn';
import Container from './Styled/Container';

import colors from './Styled/colors';
import images from './Styled/images';

import hexToRGB from './Styled/utils';

const ExploreMap = PrimaryBtn.extend`
  display: none;

  @media (min-width: 1024px){
    display: inline-block;
    position: absolute;
    padding: 1em;
    height: 4em;
  }
`;

const SeachAddressWrapper = styled.div`
  margin: auto;
  height: 100%;
  background-color: ${hexToRGB(colors.mainGreen, 0.85)};
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.18), 0 6px 6px 0 rgba(0,0,0,0.32);
  border-bottom: 1px solid transparent;
  align-items: center;
  justify-content: flex-start;
  max-width: 600px;
  padding: 1rem;

  @media (min-width: 415px) {
    border-radius: 2px;
  }

  .search_address_heading, .search_address_sub_heading {
    color: ${colors.mainWhite};
    font-family: Roboto, sans-serif;
    line-height: 1.2;
    text-align: center;
    font-weight: 600;
  }

  .search_address_heading {
    margin: 0.5em 0;
    font-size: 2.5em;
  }
  .search_address_sub_heading {
    margin-bottom: 1em;
    font-size: 1.75em;
  }

  .search_address_link {
    color: ${colors.mainWhite};
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-size: 1em;
    text-decoration: underline;
    display: inline-block;
    margin: 1rem;
    font-weight: 400;
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  background-image: url(${images.mobileHeroImage});
  background: ${colors.mainGreen};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 420px) {
    background-image: url(${images.desktopHeroImage});
    padding: 2rem;
  }
`;

const HeroCTA = ({ openMap }) => (
  <HeroWrapper>
    <Container>
      <ExploreMap onClick={openMap}>Explore The Map</ExploreMap>
      <SeachAddressWrapper>
        <h1 className="search_address_heading">Need recycling at your building?</h1>
        <h2 className="search_address_sub_heading"> Join or create a campaign!</h2>
        <AutoSuggestInput />
        <Link className="search_address_link" to="/denver-recycling-info">Learn more first</Link>
      </SeachAddressWrapper>
    </Container>
  </HeroWrapper>
);

HeroCTA.propTypes = {
  openMap: PropTypes.func.isRequired
};

export default HeroCTA;
