import {
	isBoxedObservable,
	isObservableMap,
	isObservable,
	isObservableSet,
	runInAction,
	isObservableArray,
	toJS
} from "mobx";
import { RootStore } from "./StoreContext";

class BaseStore {
	protected rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	setInitialState(initialState: any) {
		if (initialState) {
			runInAction(() => {
				Object.keys(initialState)
					.forEach((key) => {
						let currentValue = initialState[key];

						if (isObservable(this[key])) {
							const current = this[key];

							if (isObservableMap(current))
								currentValue.forEach((val) => current.set(val[0], val[1]));
							else if (isBoxedObservable(current))
								current.set(currentValue);
							else if (isObservableSet(current))
								currentValue.forEach((val) => current.add(val));
							else if (isObservableArray(current))
								currentValue.forEach((val) => current.push(val));
							else
								console.warn("Unimplemented observable type!", current);
						}
					});
			});
		}
	}

	toJS() {
		delete this.rootStore;

		return JSON.parse(JSON.stringify(toJS(this), getCircularReplacer()));
	}
}

export default BaseStore;

const getCircularReplacer = () => {
	const seen = new WeakSet();

	return (key, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) return;

			seen.add(value);
		}

		return value;
	};
};
