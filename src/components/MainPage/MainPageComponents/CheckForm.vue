<template>
    <div class="form_holder">
        <form class="check_form" @submit.prevent="submit">
            <select @change="inputX">
                <option disabled value="" selected>Please select X</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input v-model="y_value" placeholder="Input y value" @input="inputY">
            <select @change="inputR">
                <option disabled value="" selected>Please select R</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button class="submit_button" type="submit">Submit</button>
            <button class="reset_button" type="reset" @click="resetR">Reset</button>
        </form>
    </div>
    <div class="error_message" :class="is_error_visible ? 'error_visible' : 'error_invisible'">
        <p/>
        {{ error_message }}
        <p/>
    </div>
</template>

<script>

export default {
    data() {
        return {
            x_value: '',
            y_value: '',
            error_message: '',
            is_error_visible: false,
        }
    },
    methods: {
        submit: function () {
            this.$parent.sendCheckRequest(this.x_value, this.y_value);
        },
        validateY: function () {
            if (this.y_value <= -5 || this.y_value >= 5) {
                this.is_error_visible = true;
                this.error_message = "Y ∈ (-5, 5)";
            } else {
                this.error_message = "";
                this.is_error_visible = false;
            }
        },
        inputX: function (event) {
            this.x_value = event.target.value;
        },
        inputY: function (event) {
            this.validateY();
            if (event.target.value.indexOf('.') === -1) {
                return;
            }
            if ((event.target.value.length - event.target.value.indexOf('.')) > 10) {
                event.target.value = event.target.value.slice(0, event.target.value.indexOf('.') + 10 + 1);
            }
            this.y_value = event.target.value;
        },
        inputR: function (event) {
            this.$parent.changeCurR(event.target.value);
            this.hideErrorMessage();
        },
        showErrorMessage: function (errorMessage) {
            this.error_message = errorMessage;
            this.is_error_visible = true;

        },
        hideErrorMessage: function () {
            this.error_message = "";
            this.is_error_visible = false;
        },
        resetR: function() {
            this.$parent.changeCurR(0);
        }
    }
}
</script>

<style scoped>
.form_holder {
    margin-top: 5%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
}

.check_form {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
}

input {
    margin: 5%;
}

select {
    margin: 5%;
}

.submit_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 60%;
}

.reset_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    width: 60%;
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
</style>