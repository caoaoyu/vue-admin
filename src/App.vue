<template>
	<el-container id="app">
		<el-aside>
			<Menu v-if="show"></Menu>
		</el-aside>
		<el-container>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>
				<Footer v-if="show"></Footer>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import Menu from "@/components/menu.vue";
import Footer from "@/components/footer.vue";

export default {
	name: "app",
	data() {
		return {
			show: false
		};
	},
	watch: {
		$route: function() {
			this.show = this.$route.name != "login";
		}
	},
	created() {
		this.show = this.$route.name != "login";
	},
	components: {
		Menu,
		Footer
	}
};
</script>

<style lang="scss">
html,
body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
