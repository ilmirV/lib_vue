import { ref } from "vue";
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alertStore", () => {
    const alert = ref(null);

    const success = (message) => {
      alert.value = { message, type: "alert-success" };
    };

    const error = (message) => {
      alert.value = { message, type: "alert-danger" };
    };

    const clear = () => {
      alert.value = null;
    };

    return {
      alert,
      success,
      error,
      clear,
    }
});
