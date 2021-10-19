<template>
    <b-container>
        <b-row>
            <b-col cols="6">
                <b-card
                    class="mt-5"
                    header="Список доступных монет"
                >
                    <b-list-group>
                        <b-list-group-item
                            v-for="item in list"
                            :key="item.query"
                            :to="'/chart/' + item.query"
                            link
                        >
                            {{ item.name }}
                        </b-list-group-item>
                    </b-list-group>

                    <p class="card-text mt-2">
                        Выберите интересующую Вас монету!
                    </p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "Main",
        computed: {
            list() {
                return this.$coinList
            }
        }
    }
</script>

<style scoped>

</style>
