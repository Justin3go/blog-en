<template>
	<div v-show="isShow" class="warning custom-block copyright" style="margin-bottom: 50px;" @click="handleClick">
		<p class="custom-block-title">
			<font style="vertical-align: inherit">
				<font style="vertical-align: inherit">Copyright Statement(Creative Commons Attribution 4.0 International License)</font>
			</font>
		</p>
		<p>
			<font style="vertical-align: inherit">
				You are free to share and adapt this work, but you must follow these conditions: (Attribution) You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use. </font>
		</p>
	</div>
</template>
<script lang="ts" setup>
import { useRoute } from "vitepress";
import { ref, watch } from "vue";

const route = useRoute();
const isShow = ref(false)

function handleClick() {
	window.open('https://creativecommons.org/licenses/by/4.0/legalcode.zh-Hans', "_blank")
}

watch(
	() => route.path,
	() => {
		// 这类页面只显示http://localhost:5173/blog/
		isShow.value = window.location.href.includes(encodeURI('/blog/'))
	},
	{
		immediate: true,
	}
);
</script>
<style>
.copyright {
	cursor: pointer;
}</style>
