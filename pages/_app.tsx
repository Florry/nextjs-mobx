import React from "react";
import StateProvider from "../components/state/StateProvider";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<StateProvider {...pageProps}>
				<Component {...pageProps} />
			</StateProvider>
		</>
	);
}

export default MyApp;
