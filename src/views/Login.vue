<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" v-model="user_form.email" />
            <input id="input-password" type="password" placeholder="Password" v-model="user_form.password" />
            <button id="btn-submit" type="submit" :disabled="disabled" @click="auth.authenticate(user_form.email, user_form.password)">LOGIN</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
    data() {
        const auth = useAuthStore();
        return {
            auth,
            user_form: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        disabled() {
            return this.user_form.email.trim().length == 0 || this.user_form.password.trim().length < 6;
        }
    }
}
</script>