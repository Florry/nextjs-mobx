# Nextjs mobx
Just a simple mobx implementation for nextjs that aims to make transitioning from vanilla react w/ mobx to nextjs w/ mobx as painless as possible, basically trying to make the ssr part of it as invisible as possible.

## How to use
Use the middleware function for the `getServerSideProps` export
```
UseMobx(nextFunction?: (req: NextPageContext, rootStore: RootStore) => any)
```
as follows:
```
export const getServerSideProps = UseMobx(async ({ }, { userStore }) => {
	await userStore.loadUsers();
});
```

That's it, users are loaded before markup is rendered. The function can also still return any data like a normal `getServerSideProps` function in nextjs.

## Files of interest
- [middleware/UseMobx.ts](https://github.com/Florry/nextjs-mobx/blob/main/middleware/UseMobx.ts)
- [stores/BaseStore.ts](https://github.com/Florry/nextjs-mobx/blob/main/stores/BaseStore.ts#L19)
- [stores/StoreContext.ts](https://github.com/Florry/nextjs-mobx/blob/main/stores/StoreContext.ts#L13)
- [pages/index.tsx#L28](https://github.com/Florry/nextjs-mobx/blob/main/pages/index.tsx#L28) simple usage example
- [pages/products.tsx#L41](https://github.com/Florry/nextjs-mobx/blob/main/pages/products.tsx#L41) "advanced" usage example

## Notes
- Stores have to extend `BaseStore`
- Stores have to run `setInitialState` function when initialized inside root store, with `initialState.${store variable name}` as the first parameter:
	```
	this.userStore = new UserStore(this);
	this.userStore.setInitialState(initialState.userStore);
	```

## How to run example
- `npm run example`
- open `http://localhost:3000` in browser
