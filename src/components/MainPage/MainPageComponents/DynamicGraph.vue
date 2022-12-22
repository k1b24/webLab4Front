<template>
    <div class="svg-wrapper">
        <svg width="300" height="300" @click="hitCheckByClick" id="svg-graph">
            <!--Координатные оси-->
            <line x1="0" x2="300" y1="150" y2="150"></line>
            <line x1="150" x2="150" y1="0" y2="300"></line>
            <!--Стрелочки-->
            <polygon points="150,0 145,15 155,15" stroke="black"></polygon>
            <polygon points="300,150 285,145 285,155" stroke="black"></polygon>
            <!--Прямоугольник в первой четверти-->
            <polygon points="150,150 50,150 50,100 150,100"></polygon>
            <!--Четверть круга в третьей четверти-->
            <path d="M150,100 A50,50 90 0,1 200,150 L 150,150 Z"></path>
            <!--Треугольник в четвертой четверти-->
            <polygon points="150,150 100,150 150,200"></polygon>
            <!-- Подписи к осям -->
            <text x="285" y="135">X</text>
            <text x="160" y="15">Y</text>
            <!-- Метки для значений R на оси X -->
            <line x1="50" x2="50" y1="140" y2="160"></line>
            <line x1="100" x2="100" y1="140" y2="160"></line>
            <line x1="200" x2="200" y1="140" y2="160"></line>
            <line x1="250" x2="250" y1="140" y2="160"></line>
            <!-- Метки для значений R на оси Y -->
            <line x1="140" x2="160" y1="50" y2="50"></line>
            <line x1="140" x2="160" y1="100" y2="100"></line>
            <line x1="140" x2="160" y1="200" y2="200"></line>
            <line x1="140" x2="160" y1="250" y2="250"></line>
            <!-- Значения R на оси X -->
            <text x="40" y="130">-R</text>
            <text x="85" y="130">-R/2</text>
            <text x="190" y="130">R/2</text>
            <text x="245" y="130">R</text>
            <!-- Значения R на оси Y -->
            <text x="170" y="52.5">R</text>
            <text x="170" y="102.5">R/2</text>
            <text x="170" y="202.5">-R/2</text>
            <text x="170" y="252.5">-R</text>

            <circle
                    v-for="row in tableRowsByR"
                    :key="row.X"
                    :cx="150 + 100 * (row.X / row.R)"
                    :cy="150 - 100 * (row.Y / row.R)"
                    r="4"
                    :class="row.result === true ? 'green' : 'red'"/>

        </svg>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    props: ["tableRowsByR", "curR"],
    methods: {
        hitCheckByClick: function (event) {
            let target = $("#svg-graph");
            let x = Math.round(event.clientX - target.position().left);
            let y = event.clientY - target.position().top - 60;
            let xForServer = ((x - 150) / (100 / this.curR)).toFixed(3);
            let yForServer = ((y - 150 + $(window).scrollTop()) / (-100 / this.curR)).toFixed(3);
            this.$parent.sendCheckRequest(xForServer, yForServer);
        }
    }
}
</script>

<style scoped>
.svg-wrapper {
    text-align: center;
}

svg {
    stroke: rgba(0, 0, 0, 0.92);
    fill: #ffd4d5;
    margin-top: 60px;
    font-size: 70%;
    margin-left: auto;
    margin-right: auto;
}

.green {
    fill: #F1F7B5;
    stroke: #F1F7B5;
}

.red {
    fill: #FD8A8A;
    stroke: #FD8A8A;
}
</style>