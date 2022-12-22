<template>
    <div class="form_holder">
        <p>Please log in</p>
        <form class="login_form" @submit.prevent="submit">
            <input v-model="login_value" placeholder="Login" @input="inputLogin">
            <input v-model="password_value" type="password" placeholder="Password" @input="inputPassword">
            <button class="login_button" type="submit">
                Log in
            </button>
        </form>
        <p>
            Still don't have an account?
        </p>
        <div class="register_button_container">
            Create one:
            <button class="register_button" @click="goToRegister">Register</button>
        </div>


    </div>
    <div class="error_message" :class="is_error_visible ? 'error_visible' : 'error_invisible'">
        <p/>
        {{ error_message }}
        <p/>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            login_value: '',
            password_value: '',
            error_message: '',
            is_error_visible: false,
        }
    },
    methods: {
        submit: function () {
            axios.post("http://localhost:1337/token", {}, {
                auth: {
                    username: this.login_value,
                    password: this.password_value
                }
            }).then(res => {
                localStorage.token = res.data;
                this.is_error_visible = false;
                this.$router.push({name: 'main'})
            }).catch(res => {
                if (res.response.status === 401) {
                    this.error_message = "Wrong login or password!";
                    this.is_error_visible = true;
                }
            }).catch(() => {
                this.error_message = "server is down :(";
                this.is_error_visible = true;
            });
        },
        inputLogin(event) {
            this.login_value = event.target.value;
        },
        inputPassword(event) {
            this.password_value = event.target.value;
        },
        goToRegister() {
            this.$router.push({name: 'register'})
        }
    }
}
</script>

<style scoped>
.form_holder {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
}

.login_form {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
}

input {
    margin: 5%;
}

.error_message {
    margin-top: 5%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
}

.error_visible {
    visibility: visible;
}

.error_invisible {
    visibility: hidden;
}

.login_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 60%;
}

.register_button_container {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 10%;
}

.register_button {
    margin-left: auto;
    margin-right: auto;
}
</style>