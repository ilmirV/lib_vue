import { ref } from "vue";
import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import router from "@/router";
import axios from "@/config";

const baseUrl = `${import.meta.env.VITE_API_URL}/account`;

export const useAuthStore = defineStore("authStore", () => {
    // const user = ref(JSON.parse(sessionStorage.getItem("user")));
    const user = ref()
    const returnUrl = ref(null);

    const login = async (username, password) => {
        try {
            await axios.post(`${baseUrl}/login/`, { username, password })
                .then(res => {
                    console.log(res.data);
                    // update pinia state
                    user.value = res.data;
            });

            // store user details and jwt in local storage to keep user logged in between page refreshes
            // sessionStorage.setItem("user", JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(returnUrl.value || "/");
        } catch (error) {
            const alertStore = useAlertStore();
            alertStore.error(error);
        }
    };

    const logout = async () => {
        await axios.post('http://localhost:8000/accounts/logout/');
        user.value = null;
        sessionStorage.clear();
        router.push("/account/login");
    };

    return {
        user,
        returnUrl,
        login,
        logout,
    }
},

    {
        persist: {
            storage: sessionStorage,
        }
    },

);