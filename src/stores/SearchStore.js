import { ref } from "vue";
import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
// import router from "@/router";
import axios from "@/config";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

export const useSearchStore = defineStore("searchStore", () => {
  const searchQuery = ref('')
  const filteredBooks = ref([]);
  const filteredAuthors = ref([])
  // const returnUrl = ref(null);

  const search = async (values) => {
    try {
      await axios.get(`${baseUrl}/books/?search=${values}`)
        .then(res => {
          filteredBooks.value = res.data.results;
          searchQuery.value = values;
        });

      await axios.get(`${baseUrl}/authors/?search=${values}`)
        .then(res => {
          filteredAuthors.value = res.data.results;
          console.log(filteredAuthors.value)
        })

      // store user details and jwt in local storage to keep user logged in between page refreshes
      // sessionStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      // router.push(returnUrl.value || "/");
    } catch (error) {
      const alertStore = useAlertStore();
      alertStore.error(error);
    }
  };

  return {
    filteredBooks,
    filteredAuthors,
    search,
  }
},

  {
    persist: {
      storage: sessionStorage,
    }
  },

);