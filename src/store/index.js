import { createStore } from "vuex";
import axios from "axios";

const api = axios.create({
	baseURL: "https://hacker-news.firebaseio.com/v0/",
});

export default createStore({
	state: {
		items: [],
	},
	mutations: {
		loadItems(state, item) {
			state.items.push(item);
		},
		clearItems(state, item) {
			state.items = [];
		},
	},
	actions: {
		fetchItems(context, type = "top") {
			context.commit("clearItems");
			api
				.get(`${type}stories.json?limitToFirst=20&orderBy="$key"`)
				.then((res) => {
					res.data.forEach((id) => {
						api.get(`item/${id}.json?print=pretty`).then((res) => {
							context.commit("loadItems", res.data);
						});
					});
				})
				.catch((error) => {
					console.error(error);
				});
		},
	},
});
