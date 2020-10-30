<template>
    <div>
        <product-params>
            <template v-slot:buy>
                <button class="btn">立即购买</button>
            </template>
        </product-params>
        <div class="h">
            2
        </div>
                <div class="h">
            2
        </div>

                <div class="h">
            2
        </div>
                <div class="h">
            2
        </div>        <div class="h">
            2
        </div>        <div class="h">
            2
        </div>        <div class="h">
            2
        </div>        <div class="h">
            2
        </div>
    </div>
</template>
<script>
import ProductParams from '../components/ProductParam'
export default {
    name: 'product',
    components: {
        ProductParams
    }
}
</script>
<style lang="scss">
    .h {
        height: 150px;
        background-color: aqua;
    }
    button {
        margin-left: 10px; // 让组件最后一个a标签离我按钮远点
    }
</style>