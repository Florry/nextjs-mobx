import { action, computed, IObservableValue, observable, ObservableMap, runInAction, toJS } from "mobx";
import { ProductModel } from "../models/ProductModel";
import BaseStore from "./BaseStore";
import { RootStore } from "./StoreContext";

class ProductStore extends BaseStore {

	@observable
	private productRegistry: ObservableMap<string, ProductModel> = observable.map();

	@computed
	get products() {
		return Array.from(this.productRegistry.values());
	}

	constructor(rootStore: RootStore) {
		super(rootStore);
	}

	@action
	async loadProducts() {
		try {
			const { products } = await this.rootStore.fetchClient.get({
				path: "/product"
			});

			runInAction(() => products.forEach((product: ProductModel) => this.productRegistry.set(product.id, product)));
		} catch (err) {

		}
	}

	getProductById(productId: string) {
		return toJS(this.productRegistry.get(productId));
	}

	@action
	removeProduct(productId: string) {
		this.productRegistry.delete(productId);
	}

}

export default ProductStore;
