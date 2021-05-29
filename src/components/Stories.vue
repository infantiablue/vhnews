<template>
	<div v-if="items.length">
		<div class="rounded-md bg-gray-100 px-3 py-1 my-1 h-auto dark:bg-gray-800" v-for="item in items" :key="item">
			<div v-if="item" class="flex flex-wrap">
				<a
					v-if="item.url"
					class="flex-auto font-sans text-gray-700 hover:text-pink-500 dark:text-indigo-400 dark:hover:text-pink-400"
					target="_blank"
					:href="item.url ? item.url : `https://news.ycombinator.com/item?id=${item.id}`"
					>{{ item.title }}</a
				>
				<a v-else class="flex-auto font-sans text-gray-700 hover:text-pink-500 dark:text-indigo-400 dark:hover:text-pink-400" target="_blank" @click="openModal(item)">{{
					item.title
				}}</a>

				<div class="text-sm text-gray-400">
					by <span class="italic font-medium dark:text-white">{{ item.by }}</span> from <span class="italic font-medium dark:text-white">{{ parseTime(item.time) }}</span>
				</div>
				<div class="w-full text-sm flex-none mt-2">
					<div class="flex text-gray-500 dark:text-green-200">
						<svg class="flex-shrink-0 h-5 w-5 text-cyan-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<a class="mr-2 dark:text-green-200" :href="`https://news.ycombinator.com/item?id=${item.id}`" target="blank"> {{ item.descendants }} comments </a>
						<svg class="flex-shrink-0 h-5 w-5 text-cyan-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
							/>
						</svg>
						<span class="text-gray-500 dark:text-blue-200">{{ item.score }} <span v-if="item.score > 1">points</span><span v-else>point</span></span>
					</div>
				</div>
			</div>
			<div v-else class="bg-gray-100 dark:bg-gray-800 w-full p-1 flex flex-wrap">
				<div class="w-full">
					<div class="flex flex-col flex-grow">
						<div class="pl-4 pr-4 pt-1 mb-1 text-left relative flex-grow">
							<h3 class="text-lg font-bold text-gray-darkest mr-10">
								<span class="skeleton-box bg-gray-200 dark:bg-gray-600 h-5 w-1/2 inline-block"></span>
								<span class="skeleton-box bg-gray-100 dark:bg-gray-800 h-5 w-1/3 inline-block"></span>
								<span class="skeleton-box bg-gray-200 dark:bg-gray-600 h-5 w-1/6 inline-block"></span>
								<span class="skeleton-box bg-gray-200 dark:bg-gray-600 h-5 w-1/5 inline-block"></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<Modal v-if="showModal" @close="showModal = false" :item="modalItem"></Modal>
		</div>
	</div>
	<Skeleton v-else quantity="10"></Skeleton>
</template>
<script>
import * as timeago from "timeago.js";
import Modal from "./Modal.vue";
import Skeleton from "./Skeleton.vue";
export default {
	name: "Stories",
	components: { Modal, Skeleton },
	data() {
		return {
			showModal: false,
			modalItem: null,
		};
	},
	props: {
		items: Array,
	},
	methods: {
		parseTime(t) {
			return timeago.format(t * 1000);
		},
		openModal(item) {
			this.modalItem = item;
			this.showModal = true;
		},
	},
};
</script>
<style scoped>
a:hover {
	cursor: pointer;
}
</style>
