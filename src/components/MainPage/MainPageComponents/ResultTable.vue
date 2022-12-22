<template>
    <div class="table-wrapper">
        <button class="reset_table_button" @click="cleanTable()">Reset</button>
        <table class="result_table">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Время</th>
                <th>Результат</th>
            </tr>
            <tr v-for="row in tableRowsByR" :key="row.X">
                <td>{{ row.X }}</td>
                <td>{{ row.Y }}</td>
                <td>{{ row.R }}</td>
                <td>{{ row.hit_check_date }}</td>
                <td>{{ row.result }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ["tableRowsByR"],
    methods: {
        cleanTable: function () {
            this.$parent.cleanTable();
        },
    }
}
</script>

<style scoped>

.result_table {
    text-align: center;
    justify-content: center;
    border-radius: 20px 20px 20px 20px;
    background-color: #ffffff;
    border: 3px solid #ffd4d5;
    margin: 2% auto auto;
    width: 100%;
}

.table-wrapper {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 5%;
}
</style>