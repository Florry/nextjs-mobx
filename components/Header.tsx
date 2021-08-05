import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
	const { asPath: path } = useRouter();

	return (
		<>
			<h1>Hello mobx</h1>

			<div style={{
				display: "flex",
				justifyContent: "space-between"
			}}>
				<div>
					<Link href="/"><button className={path === "/" ? "active" : ""}>Index page</button></Link>
					<Link href="/products"><button className={path === "/products" ? "active" : ""} >Products page</button></Link>
				</div>

				<a href={path}><button>Hard refresh</button></a>
			</div>
		</>

	);
};

export default observer(Header);
