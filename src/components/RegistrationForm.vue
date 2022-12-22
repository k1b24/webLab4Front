<template>
    <div class="form_holder">
        <p>Input username and password</p>
        <form class="registration_form" @submit.prevent="submit">
            <input v-model="login_value" placeholder="Login" @input="inputLogin">
            <input v-model="password_value" type="password" placeholder="Password" @input="inputPassword">
            <input v-model="repeated_password_value" type="password" placeholder="Repeat password"
                   @input="reinputPassword">
            <button class="register_button" type="submit">
                Become a user
            </button>
        </form>
        <p>
            Already have an account?
        </p>
        <div class="login_button_container">
            <button class="login_button" @click="goToLogin">Login</button>
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
            repeated_password_value: '',
            error_message: '',
            is_error_visible: false,
        }
    },
    methods: {
        submit: function () {
            if (this.password_value === this.repeated_password_value) {
                axios.post("http://localhost:1337/register", {
                    username: this.login_value,
                    password: this.password_value
                })
                    .then(() => {
                        this.is_error_visible = false;
                        this.$router.push({name: 'login'})
                    }).catch(res => {
                    if (res.response.status === 400) {
                        this.error_message = "This login is already taken";
                        this.is_error_visible = true;
                    }
                }).catch(() => {
                    this.error_message = "server is down :(";
                    this.is_error_visible = true;
                });
            } else {
                this.error_message = "Passwords doesn't match";
                this.is_error_visible = true;
            }

        },
        inputLogin(event) {
            this.login_value = event.target.value;
        },
        inputPassword(event) {
            this.password_value = event.target.value;
        },
        reinputPassword(event) {
            this.repeated_password_value = event.target.value;
        },
        goToLogin() {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style scoped>
.form_holder {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
/*    width: 25%;*/
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
}

.registration_form {
    text-align: center;
    display: flex;
    flex-direction: column;
/*    width: 60%;*/
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
}

input {
    margin: 5%;
}

.error_message {
/*    width: 25%;*/
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

.register_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 60%
}

.login_button_container {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 10%;
}

.login_button {
    margin-left: auto;
    margin-right: auto;
}
</style>