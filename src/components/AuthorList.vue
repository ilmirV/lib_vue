<script setup>
import Author from '@/components/Author.vue'

const props = defineProps({
    authors: {
        required: true
    }
})
</script>

<template>
    <div class="books">
            <Author
                v-for="author of authors"
                :key="author.id"
                :id="author.id"
                :image="author.image"
                :firstName="author.first_name"
                :lastName="author.last_name"
                :dateOfBirth="author.date_of_birth"
                :dateOfDeath="author.date_of_death" />
    </div>
</template>

<style lang="scss" scoped>
.books {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>