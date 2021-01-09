<template>
	<div class="container mx-auto px-4 text-left py-10">
		<div class="flex">
			<div class="flex-auto">
				<h1 class="text-red-500 text-3xl">Top Hacker News</h1>
				<Stories :items="items"></Stories>
			</div>
			<div class="flex-auto"></div>
		</div>
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
