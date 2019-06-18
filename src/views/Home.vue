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
		<el-table :data="members" style="width: 100%" height="450" border center>
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
			v-if="members.length > 0"
			background
			layout="prev, pager, next, jumper"
			:total="members.length"
			@current-change="handle_current_change"
		></el-pagination>
		<EditMember
			v-bind:id="id"
			v-bind:show="show"
			v-bind:name="name"
			v-bind:sex="sex"
			v-bind:uid="uid"
			@handle_hide="handle_hide"
		></EditMember>
	</div>
</template>

<script>
import EditMember from "../components/EditMember";
export default {
	name: "home",
	data() {
		return {
			name: "",
			id: 1,
			show: false,
			sex: 1,
			uid: false
		};
	},
	created() {
		this.$store.dispatch("get_member", {
			phone: this.$store.state.app.user.phone,
			name,
			page_size: 0
		});
		this.$set(this.$data, "uid", this.$store.state.app.user.id);
	},
	computed: {
		members() {
			return this.$store.state.member.data;
		}
	},
	methods: {
		handle_hide() {
			this.$set(this.$data, "show", false);
		},
		handle_current_change(val) {
			console.log(val);
		},
		handle_edit(i, parm) {
			this.$set(this.$data, "show", true);
			this.$set(this.$data, "name", parm.name);
			this.$set(this.$data, "id", parm.id);
			this.$set(this.$data, "sex", parm.sex);
		},
		handle_delete(i, parm) {
			console.log(i, parm.id, this.$data);
			// this.$store.dispatch("remove_member", parm.id);
		},
		// 根据姓名筛选
		search_name() {
			if (this.data.name.length < 0) {
			} else {
			}
		},
		// 新增用户
		add_member() {
			this.$router.push("/registration");
		}
	},
	components: {
		EditMember
	}
};
</script>


<style lang="scss" scoped>
</style>