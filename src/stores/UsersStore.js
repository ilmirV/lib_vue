import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import axios from "@/config";

const baseUrl = `${import.meta.env.VITE_API_URL}/account`;

export const useUsersStore = defineStore("usersStore", () => {
  const users = ref({});
  const user = ref({});

  const register = async (user) => {
    await axios.post(`${baseUrl}/register/`, user)
      .then(res => { console.log(res.data) })
  };

  const getAll = async () => {
    users.value = { loading: true };
    try {
      await axios.get(baseUrl).then(res => {
        users.value = res.data;
      });
    } catch (error) {
      users.value = { error };
    }
  };

  const getById = async (id) => {
    user.value = { loading: true };
    try {
      await axios.get(`${baseUrl}/${id}`).then(res => {
        user.value = res.data;
      });
    } catch (error) {
      user.value = { error };
    }
  };

  const update = async (id, params) => {
    await axios.put(`${baseUrl}/${id}`, params);

    // update stored user if the logged in user updated their own record
    const authStore = useAuthStore();
    if (id === authStore.user.id) {
      // update local storage
      const user = { ...authStore.user, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // update auth user in pinia state
      authStore.user.value = user;
    }
  };

  const deleteById = async (id) => {
    // add isDeleting prop to user being deleted
    users.value.find(x => x.id === id).isDeleting = true;

    await axios.delete(`${baseUrl}/${id}`);

    // remove user from list after deleted
    users.value = users.value.filter(x => x.id !== id);

    // auto logout if the logged in user deleted their own record
    const authStore = useAuthStore();
    if (id === authStore.user.id) {
      authStore.logout();
    }
  };

  return {
    users,
    user,
    register,
    getAll,
    getById,
    update,
    deleteById,
  }
});