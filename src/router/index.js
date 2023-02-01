import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore";
import { useAlertStore } from "@/stores/AlertStore";

import HomeView from '@/views/HomeView.vue'
import BooksView from '@/views/books/BooksView.vue'
import AuthorsView from '@/views/authors/AuthorsView.vue'
import BookView from '@/views/books/BookView.vue'
import AuthorView from '@/views/authors/AuthorView.vue'
import LoginView from '@/views/account/LoginView.vue'
import RegisterView from '@/views/account/RegisterView.vue'
import UserListView from "@/views/users/UserListView.vue";
import ProfileView from "@/views/users/ProfileView.vue";
import MyBorrowedView from "@/views/users/MyBorrowedView.vue";
import AllBorrowedView from "@/views/users/AllBorrowedView.vue";
import SearchView from "@/views/SearchView.vue";
import AddAuthorView from "@/views/authors/AddAuthorView.vue";
import GenresView from "@/views/books/GenresView.vue";
import { AdminLayout, Authors, Home, Books } from "@/views/admin";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "link-secondary",
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/account/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/users/',
      name: 'Users',
      component: UserListView
    },
    {
      path: '/users/:id',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/books/',
      name: 'books',
      component: BooksView
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookView
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsView
    },
    {
      path: '/authors/:id',
      name: 'author',
      component: AuthorView
    },
    {
      path: '/mybooks',
      name: 'My books',
      component: MyBorrowedView
    },
    {
      path: '/allborrowed',
      name: 'All borrowed',
      component: AllBorrowedView
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView,
      // props: route =>({ query: route.query.q })
    },
    {
      path: '/authors/add',
      name: 'Add author',
      component: AddAuthorView
    },
    {
      path: '/genres',
      name: 'Genres',
      component: GenresView
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "",
          component: Home
        },
        {
          path: "books",
          component: Books
        },
        {
          path: "authors",
          component: Authors
        }
      ]
    }
  ]
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/account/login", "/account/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/account/login";
  }
});

export default router
