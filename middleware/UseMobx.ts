import { NextPageContext } from "next";
import { RootStore } from "../stores/StoreContext";

export function UseMobx(nextFunction?: (req: NextPageContext, rootStore: RootStore) => any) {
	const nextFn = nextFunction;

	return async function getServerSideProps(context: NextPageContext) {
		const rootStore = new RootStore();

		let response;

		/** Runs the inputted getServerSideProps function */
		try {
			response = nextFn ? (await nextFn(context, rootStore)) || {} : {};
		} catch (err) {
		}

		if (!response)
			response = {};

		if (!response.props)
			response.props = {};

		if (!response.props.state)
			response.props.state = {};

		const storeStates = {};

		/** Sets store state from the stores after inputted getServerSideProps */
		Object.keys(rootStore)
			.forEach(key => {
				if (key.toLowerCase().includes("store"))
					storeStates[key] = { ...rootStore[key].toJS() }
			});

		return {
			...response,
			props: {
				...response.props,
				state: {
					...response.props.state,
					...storeStates
				}
			}
		};
	};
}
