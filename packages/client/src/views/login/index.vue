<template>
  <div class="login-container">
    <div class="login-form">
      <div class="title-container">
        <div class="title">
          <h3>Vue3+Midway+RBAC</h3>
        </div>
      </div>
      <em-form
        ref="loginFormRef"
        :model="loginForm"
        autocomplete="on"
        label-width="0px"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username" class="el-form-item">
          <svg-icon name="user" class="svg-container" />
          <el-input
            ref="userNameRef"
            v-model="loginForm.account"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password" class="el-form-item">
          <svg-icon name="password" class="svg-container" />
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-checkbox v-model="isRember" class="el-checkbox"> 记住我 </el-checkbox>

        <el-button :loading="loading" class="btn-login" type="primary" @click.prevent="handleLogin">
          登 录
        </el-button>
      </em-form>
    </div>
  </div>
</template>

<script lang="ts">
import { EmFormType } from "@/components";
import { usePermitStore } from "@/store/modules/permit";
import { useUserStore } from "@/store/modules/user";
import { clear, getToken } from "@/utils/storage";
import { defineComponent, reactive, ref, toRefs, unref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {},
  setup() {
    const loginFormRef = ref<EmFormType.Instance>();

    const userStore = useUserStore();
    const permission = usePermitStore();

    const router = useRouter();
    if (getToken() || permission.asyncRouters.length > 0) {
      clear();
      window.location.reload();
    }

    const state = reactive({
      loginForm: {
        account: "",
        password: "",
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      isRember: false,
    });

    const handleLogin = async () => {
      const form = unref(loginFormRef);
      if (!form) return;
      state.loading = true;
      try {
        await form.validate();
        await userStore.getToken(state.loginForm);
        state.loading = false;
        router.push("/");
      } catch (error) {
        console.log(error);
        state.loading = false;
      }
    };

    return {
      loginFormRef,
      ...toRefs(state),
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
$lightGray: #333333;
$darkGray: #999999;
$loginBg: #fff;
$loginCursorColor: #fff;

.login-container {
  position: relative;
  height: 100%;
  background: url("../../assets/images/bg_login_cover.png");
  background-size: cover;

  .login-form {
    position: absolute;
    width: 400px;
    height: 460px;
    background: #ffffff;
    box-shadow: 0px 7px 47px 13px rgba(184, 206, 220, 0.35);
    border-radius: 8px;
    right: 18.75%;
    top: 50%;
    transform: translateY(-50%);
    padding: 60px 40px;

    .em-form {
      .el-form-item {
        margin-bottom: 0px;
      }
      :deep(.el-form-item__content) {
        display: flex;
        height: 32px;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        margin-top: 48px;

        .el-input {
          flex: 1;

          .el-input__wrapper {
            box-shadow: none;
            padding: 0 11px;
          }

          .el-input__inner {
            border: none;
            font-size: 18px;
          }

          :hover,
          :focus {
            background: $loginBg;
          }
        }
      }
    }

    .el-checkbox {
      margin-top: 20px;
      font-size: 14px;

      :deep(.el-checkbox__label) {
        font-size: 14px;
      }
    }

    .btn-login {
      margin-top: 56px;
      width: 100%;
      height: 42px;
      font-size: 14px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    color: $darkGray;
    margin-right: 4px;
    font-size: 24px;
  }

  .title-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .logo {
      width: 45px;
      height: 41px;
      flex: none;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 41px;
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }

      span {
        width: 150%;
        margin-left: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #333333;
        transform: scale(0.65);
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
