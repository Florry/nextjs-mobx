import { action, computed, IObservableValue, observable, ObservableMap, runInAction, toJS } from "mobx";
import { UserModel } from "../models/UserModel";
import BaseStore from "./BaseStore";
import { RootStore } from "./StoreContext";

class UserStore extends BaseStore {

	@observable
	private userRegistry: ObservableMap<string, UserModel> = observable.map();

	@observable
	private _selectedUser: IObservableValue<string> = observable.box();

	@computed
	get users() {
		return Array.from(this.userRegistry.values());
	}

	@computed
	get selectedUser() {
		return this._selectedUser.get();
	}

	constructor(rootStore: RootStore) {
		super(rootStore);
	}

	@action
	async loadUsers() {
		try {
			const { users } = await this.rootStore.fetchClient.get({
				path: "/user"
			});

			runInAction(() => users.forEach((user: UserModel) => this.userRegistry.set(user.id, user)));
		} catch (err) {

		}
	}

	getUserById(userId: string) {
		return toJS(this.userRegistry.get(userId));
	}

	@action
	async selectUser(userId: string) {
		this._selectedUser.set(userId);
	}

}

export default UserStore;
