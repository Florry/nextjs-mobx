import { observer } from "mobx-react";
import Header from "../components/Header";
import UserDisplay from "../components/UserDisplay";
import { UseMobx } from "../middleware/UseMobx";
import { UserModel } from "../models/UserModel";
import { useStore } from "../stores/StoreContext";

const IndexPage = () => {
	const { userStore } = useStore();

	return (
		<>
			<Header />
			<h2>Users from server</h2>
			<ul>
				{
					userStore.users.map((user: UserModel) => {
						return <UserDisplay id={user.id} key={user.id} />;
					})
				}
			</ul>
		</>
	);
};

export default observer(IndexPage);

export const getServerSideProps = UseMobx(async (_context, { userStore }) => {
	await userStore.loadUsers();
});
