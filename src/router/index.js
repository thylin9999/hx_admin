import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/login/index"
import Admin from "@/pages/admin"
import MemberList from "@/pages/memberList"
import AnchorList from "@/pages/anchorList"
import LiveList from "@/pages/liveList"
import Liveorder from "@/pages/liveOrder"
import LivingList from "@/pages/livingList"
import LiveRecord from "@/pages/liveRecord"
import LeagueList from "@/pages/leagueList"
import MatchList from "@/pages/matchList"
import AdvList from "@/pages/advList"
import AnnounceManage from "@/pages/announceManage"
import ContentManage from "@/pages/contentManage"
import FeedbackManage from "@/pages/feedbackManage"
import WebSet from "@/pages/webSet"

Vue.use(VueRouter)

const routes = [
    {path: "/", name: "Login", component: Login,},
    {path: "/admin", name: "Admin", component: Admin,},
    {path: "/memberList", name: "MemberList", component: MemberList},
    {path: "/anchorList", name: "AnchorList", component: AnchorList},
    {path: "/liveList", name: "LiveList", component: LiveList},
    {path: "/liveOrder", name: "liveOrder", component: Liveorder},
    {path: "/livingList", name: "livingList", component: LivingList},
    {path: "/liveRecord", name: "LiveRecord", component: LiveRecord},
    {path: "/leagueList", name: "LeagueList", component: LeagueList},
    {path: "/matchList", name: "MatchList", component: MatchList},
    {path: "/announceManage", name: "AnnounceManage", component: AnnounceManage},
    {path: "/advList", name: "AdvList", component: AdvList},
    {path: "/contentManage", name: "ContentManage", component: ContentManage},
    {path: "/feedbackManage", name: "FeedbackManage", component: FeedbackManage},
    {path: "/webSet", name: "WebSet", component: WebSet},
    {path: '*', redirect: "/admin"},
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
