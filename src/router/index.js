import { createRouter, createWebHistory } from 'vue-router';

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
        { path: '/free', component: () => import('../pages/Community/FreeBoard/FreeListPage.vue') },
        { path: '/free/detail/:id', component: () => import('../pages/Community/FreeBoard/FreeDetailPage.vue') },
        { path: '/free/write', component: () => import('../pages/Community/FreeBoard/FreeWritePage.vue') },
        { path: '/free/edit/:id', component: () => import('../pages/Community/FreeBoard/FreeEditPage.vue') },
        { path: '/open', component: () => import('../pages/Community/OpenBoard/OpenListPage.vue') },
        { path: '/open/detail/:id', component: () => import('../pages/Community/OpenBoard/OpenDetailPage.vue') },
        { path: '/open/write', component: () => import('../pages/Community/OpenBoard/OpenWritePage.vue') },
        { path: '/open/edit/:id', component: () => import('../pages/Community/OpenBoard/OpenEditPage.vue') },

        // Notice Board
        { path: '/notice', component: () => import('../pages/Notice/NoticeListPage.vue') },
        { path: '/notice/detail/:id', component: () => import('../pages/Notice/NoticeDetailPage.vue') },
        { path: '/notice/write', component: () => import('../pages/Notice/NoticeWritePage.vue') },
        { path: '/notice/edit/:id', component: () => import('../pages/Notice/NoticeEditPage.vue') },

        // Project Board
        { path: '/project', component: () => import('../pages/Project/ProjectListPage.vue') },
        { path: '/project/detail/:id', component: () => import('../pages/Project/ProjectDetailPage.vue') },
        { path: '/project/write', component: () => import('../pages/Project/ProjectWritePage.vue') },
        { path: '/project/edit/:id', component: () => import('../pages/Project/ProjectEditPage.vue') },

        // Market Board
        { path: '/market', component: () => import('../pages/Market/Board/MarketListPage.vue') },
        { path: '/market/detail/:idx', component: () => import('../pages/Market/Board/MarketDetailPage.vue') },
        { path: '/market/write', component: () => import('../pages/Market/Board/MarketWritePage.vue') },
        // Market Chat
        { path: '/market/chat', component: () => import('../pages/Market/Chat/MarketChatPage.vue') },

        // Reservation
        { path: '/reservation', component: () => import('../pages/Reservation/ReservationPage.vue') },
    ]
});

export default router;