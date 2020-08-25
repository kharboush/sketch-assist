import { createGlobalStyle } from 'styled-components';
import { getColor } from '../../utils/colors';

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
  transition: 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:focus {
  outline: none;
  box-shadow: 0px 0px 0px 4px ${getColor('primary', 20)};
  }

  &:active & &:focus {
    box-shadow: none;
  }
}

h1 {
  font-family: 'Krona One', sans-serif;
  color: ${getColor('primary')};
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 16px;
}

input[type="search"] {
  -webkit-appearance: textfield;
}

input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
`;

export default GlobalStyle;
