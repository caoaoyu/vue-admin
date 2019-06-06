<template>
	<div class="home">
		<el-row class="search_box space-mb20" :gutter="20">
			<el-col :span="6">
				<el-input placeholder="请输入内容" v-model="name">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="search_name"></i>
				</el-input>
			</el-col>
			<el-col :span="6" :offset="12">
				<el-button type="primary" @click="add_member">新增用户</el-button>
			</el-col>
		</el-row>
		<el-table :data="list" style="width: 100%" height="450" border center>
			<el-table-column label="ID">
				<template slot-scope="scope">{{ scope.row.id }}</template>
			</el-table-column>
			<el-table-column label="姓名">
				<template slot-scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handle_edit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handle_delete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="space-mt20"
			v-if="list.length > 0"
			background
			layout="prev, pager, next, jumper"
			:total="list.length"
			@current-change="handle_current_change"
		></el-pagination>
	</div>
</template>

<script>
export default {
	name: "home",
	data() {
		return {
			name: "",
			list: []
		};
	},
	created() {
		this.$store.dispatch("get_member", {
			phone: this.$store.state.app.user.phone,
			name,
			page_size: 0
		});
	},
	computed: {
		members() {
			console.log(this.$store.state.member.data);
			this.data.list = this.$store.state.member.data || [];
		}
	},
	methods: {
		handle_current_change(val) {
			console.log(val);
		},
		handle_edit(i, parm) {
			console.log(i, parm.id);
		},
		handle_delete() {
			console.log(i, parm);
		},
		// 根据姓名筛选
		search_name() {
			if (this.data.name.length < 0) {
			} else {
			}
		},
		// 新增用户
		add_member() {
			console.log("add_member");
		}
	}
};
</script>


<style lang="scss" scoped>
</style>