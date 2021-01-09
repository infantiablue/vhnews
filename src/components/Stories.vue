<template>
	<div v-if="items.length">
		<div class="rounded-md bg-blue-50 px-3 py-1 my-1 h-auto" v-for="item in items" :key="item.id">
			<div class="flex flex-wrap">
				<a class="flex-auto font-sans text-black" target="blank" :href="item.url">{{ item.title }}</a>
				<div class="text-sm text-gray-500">{{ parseTime(item.time) }}</div>
				<div class="w-full text-sm flex-none mt-2">
					<div class="flex text-indigo-500">
						<svg class="flex-shrink-0 h-5 w-5 text-cyan-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
						</svg>
						<a class="mr-1" :href="`https://news.ycombinator.com/item?id=${item.id}`" target="blank"> {{ item.descendants }} comments </a>
						<svg class="flex-shrink-0 h-5 w-5 text-cyan-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
						</svg>
						<span class="text-yellow-500">by {{ item.by }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<svg class="text-red-500 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	</div>
</template>
<script>
import * as timeago from "timeago.js";
export default {
	name: "Stories",
	props: {
		items: Array,
	},
	methods: {
		parseTime(t) {
			return timeago.format(t * 1000);
		},
	},
};
</script>
<style scoped>
a:hover {
	color: hotpink;
}
</style>
