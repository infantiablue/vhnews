<template>
	<teleport to="body">
		<transition name="fade">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container bg-white dark:bg-black">
						<div class="modal-header">
							<slot name="header"
								><h5 class="text-blue-700 dark:text-pink-600 text-3xl font-semibold text-center mb-5">{{ item.title }}</h5></slot
							>
						</div>
						<div class="modal-body">
							<slot name="body"><p class="text-justify font-mono subpixel-antialiased text-xl leading-8" v-html="item.text"></p></slot>
						</div>
						<div class="modal-footer pb-5 text-right">
							<slot name="footer">
								<button class="py-2 px-4 rounded-md bg-indigo-600 text-white right text-lg" @click="$emit('close')">Close</button>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</teleport>
</template>
<script>
export default {
	name: "Modal",
	emits: ["close"],
	props: {
		item: Object,
	},
};
</script>
<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 75vw;
	margin: 0px auto;
	padding: 20px 30px;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
