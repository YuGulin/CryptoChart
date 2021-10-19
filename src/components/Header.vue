<template>
    <div>
        <b-navbar
            class="px-5"
            toggleable="lg"
            type="dark"
            variant="primary"
        >
            <b-navbar-brand>
                CryptoChart's
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" />

            <b-collapse
                id="nav-collapse"
                is-nav
            >
                <b-navbar-nav>
                    <b-nav-item
                        v-for="item in list"
                        :key="item.query"
                        :to="'/chart/' + item.query"
                        active-class="active"
                    >
                        {{ item.name }}
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>


<script>
    export default {
        name: "Header",
        computed: {
            list() {
                return this.$coinList
            }
        }
    }
</script>


