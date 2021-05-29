<template>
	<div class="bg-gray-100 dark:bg-gray-800 w-full p-2 my-2 rounded-md" v-for="item in range(0, quantity)" :key="item">
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
</template>
<script>
export default {
	name: "Skeleton",
	props: {
		quantity: [Number, String],
	},
	methods: {
		range(start, end) {
			return Array.apply(0, Array(end - 1)).map((element, index) => index + start);
		},
	},
};
</script>
<style scoped>
.skeleton-box {
	position: relative;
	overflow: hidden;
}
.skeleton-box::after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	-webkit-transform: translateX(-100%);
	-ms-transform: translateX(-100%);
	transform: translateX(-100%);
	background-image: -webkit-gradient(
		linear,
		left top,
		right top,
		color-stop(0, rgba(255, 255, 255, 0)),
		color-stop(20%, rgba(255, 255, 255, 0.2)),
		color-stop(60%, rgba(255, 255, 255, 0.5)),
		to(rgba(255, 255, 255, 0))
	);
	background-image: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
	background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
	-webkit-animation: shimmer 3s infinite;
	animation: shimmer 3s infinite;
	content: "";
}
@-webkit-keyframes shimmer {
	100% {
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}
}
@keyframes shimmer {
	100% {
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}
}
</style>
