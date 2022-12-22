<template>
    <header>
        <p>Лазеев Сергей P32111, Вариант: 11112</p>
        <div class="logout_button_container">
            <button class="logout_button" @click="goToLogin">Log out</button>
        </div>
    </header>
    <DynamicGraph class="graph" :tableRowsByR="tableRowsByR" :curR="curR"/>
    <CheckForm class="form" ref="CheckForm"/>
    <ResultTable class="table" :tableRowsByR="tableRowsByR"/>
</template>

<script>
import axios from 'axios';

import CheckForm from "@/components/MainPage/MainPageComponents/CheckForm.vue"
import ResultTable from "@/components/MainPage/MainPageComponents/ResultTable.vue";
import DynamicGraph from "@/components/MainPage/MainPageComponents/DynamicGraph.vue";

export default {
    mounted() {
        this.getAllResultsFromServer();
    },
    components: {
        CheckForm, ResultTable, DynamicGraph
    },
    data() {
        return {
            tableRowsByR: [],
            curR: 0,
            allTableRows: [],
        }
    },
    methods: {
        goToLogin: function () {
            this.$router.push({name: 'login'});
            localStorage.removeItem("token");
        },
        cleanTable: function () {
            axios.post("http://localhost:1337/deleteResults", {}, {
                headers: {Authorization: "Bearer " + localStorage.token}
            }).then(() => {
                this.allTableRows = [];
                this.tableRowsByR = [];
            }).catch(res => {
                if (res.response.status === 401) {
                    this.$router.push({name: 'login'})
                }
            })
        },
        changeCurR: function (r) {
            this.curR = Number(r);
            this.tableRowsByR = [];
            this.allTableRows.forEach(elem => {
                if (elem.R === this.curR) {
                    this.tableRowsByR.push(elem);
                }
            });
        },
        sendCheckRequest: function (x, y) {
            let error_message = '';
            let isValid = true;
            if (this.curR === 0) {
                error_message += "Please choose R";
                isValid = false;
            }
            if (x === '') {
                if (error_message !== "") error_message += ", "
                error_message += "Please choose X";
                isValid = false;
            }
            if (y === '') {
                if (error_message !== "") error_message += ", ";
                error_message += "Please input Y";
                isValid = false;
            }
            if (Number(x) < -3 || Number(x) > 5) {
                if (error_message !== "") error_message += ", ";
                error_message += "X ∈ [-3; 5]";
                isValid = false;
            }
            if (Number(y) <= -5 || Number(y) >= 5) {
                if (error_message !== "") error_message += ", ";
                error_message += "Y ∈ (-5, 5)";
                isValid = false;
            }
            if (!isValid) {
                this.$refs.CheckForm.showErrorMessage(error_message);
                return;
            }
            this.$refs.CheckForm.hideErrorMessage();
            axios.post("http://localhost:1337/check", {
                    x: Number(x),
                    y: Number(y),
                    r: Number(this.curR),
                    timezone_offset: (new Date()).getTimezoneOffset(),
                },
                {
                    headers: {Authorization: "Bearer " + localStorage.token}
                }).then(res => {
                this.is_error_visible = false;
                let hitCheckResponse = {
                    X: res.data.x,
                    Y: res.data.y,
                    R: res.data.r,
                    result: res.data.result,
                    hit_check_date: res.data.hit_check_date.slice(0, 10) + " " + res.data.hit_check_date.slice(11, 19)
                }
                this.tableRowsByR.push(hitCheckResponse);
                this.allTableRows.push(hitCheckResponse);
            }).catch(res => {
                if (res.response.status === 401) {
                    this.$router.push({name: 'login'})
                }
            }).catch(res => {
                res;
                //TODO server is down message
            })

        },
        getAllResultsFromServer: function () {
            axios.get("http://localhost:1337/results",
                {
                    headers: {Authorization: "Bearer " + localStorage.token}
                }).then(res => {
                res.data.forEach(elem => {
                    this.allTableRows.push({
                        X: elem.x,
                        Y: elem.y,
                        R: elem.r,
                        result: elem.result,
                        hit_check_date: elem.hit_check_date.slice(0, 10) + " " + elem.hit_check_date.slice(11, 19)
                    });
                })
                this.changeCurR(this.curR);
            }).catch(res => {
                if (res.response.status === 401) {
                    this.$router.push({name: 'login'})
                }
            });
        }
    }
}
</script>

<style>
</style>