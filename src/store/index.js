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
	},
	actions: {
		loadLatestTopItems(context) {
			api
				.get('topstories.json?limitToFirst=10&orderBy="$key"')
				.then((res) => {
					res.data.forEach((id) => {
						api.get(`item/${id}.json?print=pretty`).then((res) => {
							// console.log(res.data);
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
