import Header from "../components/Header";
import { UseMobx } from "../middleware/UseMobx";
import { UserModel } from "../models/UserModel";
import { useStore } from "../stores/StoreContext";
import UserDisplay from "../components/UserDisplay";
import { observer } from "mobx-react";
import { ProductModel } from "../models/ProductModel";
import ProductDisplay from "../components/ProductDisplay";

const ProductsPage = ({ date }) => {
	const { userStore, productStore } = useStore();

	return (
		<>
			<Header />
			<h5>Rendered at {date}</h5>

			<h2>Products from server</h2>
			{!productStore.products.length && "No products found."}
			<ul>
				{
					productStore.products.map((product: ProductModel) => {
						return <ProductDisplay id={product.id} key={product.id} />;
					})
				}
			</ul>
			<h4>Users from server again</h4>
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

export default observer(ProductsPage);

export const getServerSideProps = UseMobx(async (_context, { userStore, productStore }) => {
	await Promise.all([
		productStore.loadProducts(),
		userStore.loadUsers()
	]);

	return {
		props: {
			date: new Date().toJSON()
		}
	}
});
