import { observer } from "mobx-react";
import { useStore } from "../stores/StoreContext";

interface Props {
	id: string;
}

const ProductDisplay = ({ id }: Props) => {
	const { productStore } = useStore();
	const product = productStore.getProductById(id);

	const removeProduct = () => productStore.removeProduct(id);

	return (
		<li>{product.name}: {product.price} SEK <button className="remove" onClick={removeProduct}>Remove</button></li>
	);
};

export default observer(ProductDisplay);
