import { createGlobalStyle } from "styled-components";

const GlobalStyes = createGlobalStyle`


* {
	box-sizing: border-box;
}

body {
	width: 100%;
	height: 100vh;
	margin: 0;
	font-family: Poppins, sans-serif;
background-color: #fdfdfd;
}

h1 {
	font-size: 2rem;
	margin: 0.67em 0;
}

a {
	 background-color: transparent;
	 text-decoration: none;
}

img {
	width: 100%;
	border-style: none;
}

input {
	border: none;
}

button {
background-color: transparent;
border: none;
}

`;

export default GlobalStyes;
