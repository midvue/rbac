<template>
  <div class="right-menu">
    <span>{{ userInfo.nickname }}</span>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="@/assets/images/user-avatar.jpg" class="user-avatar" />
        <span>{{ userInfo.nickname }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu n class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <a target="_blank" href="http://192.168.100.222:4123">
            <el-dropdown-item>开发环境</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="icon-full-screen">
      <svg-icon name="fullscreen" />
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/modules/user";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
// import { useColor } from "@/vhooks";

export default defineComponent({
  name: "RightMenu",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    // const { mixColor, hexColorToRgba, rgbaToHexColor } = useColor();
    const userInfo = computed(() => {
      return userStore.userInfo || {};
    });
    const logout = async () => {
      await userStore.logout();
      router.push(`/login`);
    };

    return { userInfo, logout };
  },
});
</script>

<style lang="scss" scoped>
.right-menu {
  height: 100%;
  line-height: 50px;
  margin-right: 10px;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      position: relative;
      color: #fff;
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;

      .user-avatar {
        cursor: pointer;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 10px;
      }
    }
  }

  .icon-full-screen {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    padding-left: 10px;
  }
}
</style>
