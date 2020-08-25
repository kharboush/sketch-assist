import { createGlobalStyle } from 'styled-components';
import { getColor } from '../utils/colors';

const GlobalStyle = createGlobalStyle`
html,
body {
  color: ${getColor('primary')};
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  font-family: 'Work Sans', sans-serif;
  font-size: 16px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

`;

export default GlobalStyle;
