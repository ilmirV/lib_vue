<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        default: ''
    },
    dateOfDeath: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="book">
        <router-link :to="`authors/${id}`">
            <img class="book-photo" :src="image" :alt="firstName">
        </router-link>
        <h2 class="book-title">
            <router-link :to="`/authors/${id}`" class="book-title__link">{{ firstName }} {{ lastName }}</router-link>
        </h2>
    </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
}

.book {
    // border: 1px solid;
    // margin: 0 20px;
    max-width: 300px;
    &-title {
        font-family: var(--secondary-font);
        font-size: 20px;
        line-height: 28px;
        font-weight: 400;
        // margin-bottom: 8px;
        &__link {
            color: var(--primary-font-color);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    &-author {
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        &__link {
            color: var(--secondary-font-color);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>