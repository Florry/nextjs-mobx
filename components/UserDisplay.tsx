import { observer } from "mobx-react";
import { useStore } from "../stores/StoreContext";

interface Props {
	id: string;
}

const UserDisplay = ({ id }: Props) => {
	const { userStore } = useStore();
	const user = userStore.getUserById(id);

	const selectUser = () => userStore.selectUser(id);

	return (
		<li style={{
			fontWeight: userStore.selectedUser === user.id && 600,
			cursor: "pointer"
		}}
			onClick={selectUser}
		>
			{user.firstName} {user.lastName} - {user.age}
		</li>
	);
};

export default observer(UserDisplay);
