import styled, { createGlobalStyle } from "styled-components";

export const GlobalSection = styled.section`
  width: 100%;
  padding: 0 10px;
`

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

&::-webkit-scrollbar {
  width: 6px;              
}

&::-webkit-scrollbar-track {
  background: #C9C9C9;
}

&::-webkit-scrollbar-thumb {
  background-color: #8C8C8C; 
  border-radius: 20px;    
  border: 1px solid #C9C9C9; 
}

:root {
  --gray-20: #ECECEC;
  --black: #000;
}

body {
  background: var(--gray-20);
  color: var(--black);
}

@media (max-width:1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width:720px) {
  html {
    font-size: 87.5%;
  }
}

body, input, textarea, button, select {
  font: 400 1rem "Roboto", sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
`