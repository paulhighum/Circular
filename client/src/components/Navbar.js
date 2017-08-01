import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import Container from './Styled/Container';
import colors from './Styled/colors';

const StyledNavBar = styled.nav`
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  .home-link {
    color: ${colors.mainGreen};
    font-size: 2rem;
    font-family: 'Fira Sans Condensed', sans-serif;
    font-weight: 700;
    text-decoration: none;
  }
`;

const NavBar = () => (
  <StyledNavBar>
    <Container>
      <div className="row">
        <div className="col-md-9">
          <p>
            <Link className="home-link" to="/">Recycling Request Tool</Link>
          </p>
        </div>

        <div className="col-md-3">
          <ul className="top-nav-list">
            {/*  <li>sign in with google</li>
            <li>sign in with facebook</li>*/}
          </ul>
        </div>
      </div>
    </Container>
  </StyledNavBar>
);

export default NavBar;
