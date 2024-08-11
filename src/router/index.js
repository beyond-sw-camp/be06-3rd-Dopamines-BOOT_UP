import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/pages/User/stores/useUserStore";

// 접근 허가 관련
// 로그인 했는지 안했는지
// const requireLogin = async (from, to, next) => { // next함수를 이용해서 from에서 to로 이동
//     const userStore = useUserStore();
//     const auth = await userStore.getAuth();
//     console.log("auth error?: ", auth)
//     if (auth != null && auth !== "ROLE_TEMPORARY_USER") {
//         console.log("auth check: ", auth);
//         return next();
//     } else {
//         if (confirm("이용 권한이 필요합니다.")) {
//             return next("/user/login");
//         }
//     }
// }
const requireLogin = async (to, from, next) => {
    const userStore = useUserStore();
    try {
        const auth = await userStore.getAuth();
        console.log("auth:", auth);

        if (auth != null && auth !== "ROLE_TEMPORARY_USER") {
            console.log("auth check:", auth);
            return next();
        } else {
            if (confirm("이용 권한이 필요합니다.")) {
                return next("/user/login");
            }
        }
    } catch (error) {
        console.error("Authentication check failed:", error);
        next("/user/login");  // 인증 실패 시 로그인 페이지로 리다이렉트
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Main
        { path: '/', component: () => import('../pages/Main/MainPage.vue') },
        { path: '/search', component: () => import('../pages/Main/SearchPage.vue') },

        // User
        {
            path: '/user',
            component: () => import('../pages/User/UserLayout.vue'),
            children: [
                { path: 'login', component: () => import('../pages/User/LoginPage.vue') },
                { path: 'signup/agree', component: () => import('../pages/User/SignupAgree.vue') },
                { path: 'signup/info', component: () => import('../pages/User/SignupPage.vue') },
                // { path: 'signup/complete', component: () => import('../pages/User/SignupComplete.vue') },
                { path: 'signup/success', component: () => import('../pages/User/SignupSuccessPage.vue') }
            ]
        },

        // Community
        { path: '/community', component: () => import('../pages/Community/CommunityBoardListPage.vue') },
        { path: '/free', component: () => import('../pages/Community/FreeBoard/FreeListPage.vue'), beforeEnter: requireLogin  },
        { path: '/free/detail/:id', component: () => import('../pages/Community/FreeBoard/FreeDetailPage.vue'), beforeEnter: requireLogin  },
        { path: '/free/write', component: () => import('../pages/Community/FreeBoard/FreeWritePage.vue'), beforeEnter: requireLogin  },
        { path: '/free/edit/:id', component: () => import('../pages/Community/FreeBoard/FreeEditPage.vue'), beforeEnter: requireLogin  },
        { path: '/open', component: () => import('../pages/Community/OpenBoard/OpenListPage.vue') },
        { path: '/open/detail/:id', component: () => import('../pages/Community/OpenBoard/OpenDetailPage.vue') },
        { path: '/open/write', component: () => import('../pages/Community/OpenBoard/OpenWritePage.vue') },
        { path: '/open/edit/:id', component: () => import('../pages/Community/OpenBoard/OpenEditPage.vue') },

        // Notice Board
        { path: '/notice', component: () => import('../pages/Notice/NoticeListPage.vue'), beforeEnter: requireLogin  },
        { path: '/notice/detail/:id', component: () => import('../pages/Notice/NoticeDetailPage.vue'), beforeEnter: requireLogin  },
        { path: '/notice/write', component: () => import('../pages/Notice/NoticeWritePage.vue'), beforeEnter: requireLogin  },
        { path: '/notice/edit/:id', component: () => import('../pages/Notice/NoticeEditPage.vue'), beforeEnter: requireLogin  },

        // Project Board
        { path: '/project', component: () => import('../pages/Project/ProjectListPage.vue') },
        { path: '/project/detail/:id', component: () => import('../pages/Project/ProjectDetailPage.vue') },
        { path: '/project/write', component: () => import('../pages/Project/ProjectWritePage.vue'), beforeEnter: requireLogin  },
        { path: '/project/edit/:id', component: () => import('../pages/Project/ProjectEditPage.vue'), beforeEnter: requireLogin  },

        // Market Board
        { path: '/market', component: () => import('../pages/Market/Board/MarketListPage.vue'), beforeEnter: requireLogin },
        { path: '/market/detail/:idx', component: () => import('../pages/Market/Board/MarketDetailPage.vue'), beforeEnter: requireLogin },
        { path: '/market/write', component: () => import('../pages/Market/Board/MarketWritePage.vue'), beforeEnter: requireLogin  },
        // Market Chat
        { path: '/market/chat', component: () => import('../pages/Market/Chat/MarketChatPage.vue'), beforeEnter: requireLogin  },

        // Reservation
        { path: '/reservation', component: () => import('../pages/Reservation/ReservationPage.vue'), beforeEnter: requireLogin },
    ]
});

export default router;