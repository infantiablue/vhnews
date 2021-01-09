<template>
	<div class="md:container md:mx-auto px-5 text-left py-10">
		<div class="flex flex-col">
			<div class="flex-auto">
				<h1 class="text-red-500 text-3xl font-semibold text-center mb-5">HackerNews - Top Stories</h1>
				<Stories :items="items"></Stories>
			</div>
		</div>
		<div class="mt-6 text-base leading-6 font-bold text-center">© 2020 Made with 🧡 by <a class="text-blue-600 hover:text-pink-500" href="https://twitter.com/infantiablue">Truong Phan</a>. Read <a target="blank" class="text-blue-600 hover:text-pink-500" href="https://infantiablue.medium.com/hackernews-reader-with-vue-3-vite-2-and-vuex-4-part-1-247315ceb06a">the article</a></div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Stories from "./components/Stories.vue";
export default {
	name: "app",
	components: { Stories },
	data() {
		return {};
	},
	computed: {
		...mapState(["items"]),
	},
	created() {
		this.$store.dispatch("loadLatestTopItems");
	},
};
</script>
