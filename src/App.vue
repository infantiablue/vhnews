<template>
	<div class="md:container md:mx-auto px-5 text-left py-10">
		<div class="flex flex-col">
			<h1 class="text-blue-700 dark:text-pink-400 text-3xl font-semibold text-center mb-5">Hacker News Headlines</h1>
			<div class="flex justify-between">
				<div class="text-pink-600 dark:text-yellow-200 text-xl">
					<span :ref="`topic-${topic.key}`" class="tab mr-2 cursor-pointer font-serif" v-for="topic in topics" :key="topic.key" @click="loadStories(topic.key, $event)">{{ topic.title }}</span>
				</div>
				<div class="theme-switch-wrapper">
					<span ref="toggleDark" class="h-6 w-6 flex items-center justify-center cursor-pointer bg-blue-500 dark:bg-green-500 rounded-full" @click="toggleDarkMode">☀️</span>
				</div>
			</div>
			<Stories :items="items"></Stories>
		</div>
		<div class="mt-6 text-base leading-6 font-bold text-center">© 2020 Made with 🧡 by <a class="" href="https://twitter.com/infantiablue">Truong Phan</a>. Read <a target="blank" href="https://infantiablue.medium.com/hackernews-reader-with-vue-3-vite-2-and-vuex-4-part-1-247315ceb06a">the article</a>.</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Stories from "./components/Stories.vue";
export default {
	name: "app",
	components: { Stories },
	data() {
		return {
			topics: [
				{ key: "top", title: "Top" },
				{ key: "best", title: "Best" },
				{ key: "new", title: "New" },
				{ key: "ask", title: "Ask" },
				{ key: "show", title: "Show" },
				{ key: "job", title: "Jobs" },
			],
		};
	},
	computed: {
		...mapState(["items"]),
	},
	created() {
		if (!("topic" in localStorage)) localStorage.topic = "top";
		this.loadStories(localStorage.topic);
		if (!("theme" in localStorage)) localStorage.theme = "dark";
	},
	mounted() {
		this.toggleDarkMode(localStorage.theme);
		this.$refs[`topic-${localStorage.topic}`].classList.add("text-green-500");
	},
	methods: {
		toggleDarkMode(theme, evt) {
			let htmlElm = document.querySelector("html");
			const setLight = () => {
				htmlElm.classList.remove("dark");
				localStorage.theme = "light";
				this.$refs.toggleDark.textContent = "☀️";
			};
			const setDark = () => {
				htmlElm.classList.add("dark");
				localStorage.theme = "dark";
				this.$refs.toggleDark.textContent = "🌙";
			};
			if (typeof theme === "string") {
				if (theme == "dark") setDark();
				else setLight();
			} else {
				if (localStorage.theme === "dark") setLight();
				else setDark();
			}
		},
		loadStories(topic, evt) {
			this.$store.dispatch("fetchItems", topic);
			localStorage.topic = topic;
			if (evt) {
				document.querySelectorAll(".tab").forEach((elm) => {
					elm.classList.remove("text-green-500");
				});
				evt.target.classList.add("text-green-500");
			}
		},
	},
};
</script>
