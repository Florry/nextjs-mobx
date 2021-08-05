type RequestOptions = {
	method: string;
	path: string;
};

type GetRequestOptions = {
	path: string;
};

class FetchClient {

	private baseFetchOptions: any;

	private apiRoot: string;

	constructor() {
		this.apiRoot = "http://localhost:4000";

		this.baseFetchOptions = {
			mode: "cors",
			credentials: "include",
			headers: { "Content-Type": "application/json" }
		};
	}

	async get({ path }: GetRequestOptions) {
		return await this.doRequest({ method: "get", path });
	}

	async doRequest({ method, path }: RequestOptions) {
		const fetchOptions = {
			...this.baseFetchOptions,
			method
		};

		const resp = await fetch(this.apiRoot + path, fetchOptions);
		const jsonResp = await resp.json();

		return jsonResp;
	}

	toJSON() {
		return "{}";
	}
}

export default FetchClient;
