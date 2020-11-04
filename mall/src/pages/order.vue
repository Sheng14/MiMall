<template>
    <div>
        <router-view></router-view>
        <search-bar></search-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavFooter from '../components/NavFooter'
import SearchBar from '../components/SearchBar'
export default {
    name: 'order',
    components: {
        NavFooter,
        SearchBar
    },
    data () {
        return {
            title: '',
            tip: ''
        }
    }
}
</script>