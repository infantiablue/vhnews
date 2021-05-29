import { createStore } from "vuex";
import axios from "axios";
export const ITEMS_PER_PAGE = 10;
const api = axios.create({
	baseURL: "https://hacker-news.firebaseio.com/v0/",
});

async function* asyncGetter(data) {
	let i = 0;
	while (i < data.length) {
		let res = await api.get(`item/${data[i]}.json?print=pretty`);
		i++;
		yield res.data;
	}
}

export default createStore({
	state: {
		topic: "top", // default topic
		loading: false,
		page: 1, // default page
		items: [],
		endPagination: false,
	},
	mutations: {
		setTopic(state, topic) {
			state.topic = topic;
		},
		setLoading(state, status) {
			state.loading = status;
		},
		setEndPagination(state, status) {
			state.endPagination = status;
		},
		setPage(state, page) {
			state.page = page;
		},
		increasePage(state) {
			state.page++;
		},
		loadItems(state, items) {
			state.items = [...state.items, ...items];
		},
		clearItems(state) {
			state.items = [];
		},
	},
	actions: {
		async fetchItems(context, topic) {
			// init current page
			let curPage;
			// init local items storage
			let items = [];
			// if the requested topic is not the same with current topic, then reset relevant variables
			if (topic !== this.state.topic) {
				context.commit("setTopic", topic); // set the  new topic
				context.commit("clearItems"); // clear items
				context.commit("setEndPagination", false); // reset
				context.commit("setPage", 1); // reset
			} else context.commit("increasePage"); // if not, inrease the number of current page
			curPage = this.state.page;
			context.commit("setLoading", true);
			// make the request
			let resp = await api.get(`${this.state.topic}stories.json?limitToFirst=${ITEMS_PER_PAGE * curPage}&orderBy="$key"`);
			// slice data
			let result = resp.data.slice((curPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * curPage);
			if (result.length === 0) context.commit("setEndPagination", true);
			else
				for await (let item of asyncGetter(resp.data)) {
					items.push(item);
				}
			context.commit("loadItems", items);
			context.commit("setLoading", false);
		},
	},
});
