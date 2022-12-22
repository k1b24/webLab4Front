//import Vue from 'vue';
import { createApp } from 'vue'
import App from "./App.vue"
import {createRouter, createWebHistory} from "vue-router";
import LoginForm from "@/components/LoginForm.vue"
import RegistrationForm from "@/components/RegistrationForm.vue";
import MainPage from "@/components/MainPage/MainPage.vue"

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginForm
        },
        {
            path: "/register",
            name: "register",
            component: RegistrationForm
        },
        {
            path: "/",
            name: "main",
            component: MainPage
        }
    ]
})

createApp(App).use(router).mount("#app")
