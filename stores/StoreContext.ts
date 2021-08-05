import React from "react";
import FetchClient from "../clients/FetchClient";
import ProductStore from "./ProductStore";
import UserStore from "./UserStore";

export class RootStore {

	fetchClient: FetchClient;

	userStore: UserStore;
	productStore: ProductStore;

	constructor(initialState: any = {}) {
		this.fetchClient = new FetchClient();

		this.userStore = new UserStore(this);
		this.userStore.setInitialState(initialState.userStore);

		this.productStore = new ProductStore(this);
		this.productStore.setInitialState(initialState.productStore);
	}

}

export const rootStore = new RootStore({});

const StoreContext = React.createContext(rootStore);

export default StoreContext;

export const useStore = () => React.useContext(StoreContext);
