import { getLessons, getSliders } from '@/api/home'
import { CATOGORY_TYPES,IHomeState, ILesson, ILessons, ISlider } from '@/typings'
import { Module } from 'vuex'
import {IGlobalState} from '..'
import * as Types from '../action-types'

// 首页里应该存哪些数据
const state: IHomeState = {
    currentCategory: CATOGORY_TYPES.ALL,
    sliders: [],
    lessons: {
        hasMore: true, // 有没有更多数据
        loading: false, // 默认没有正在加载
        offset: 0,
        limit: 5,
        list: [] // 当前已经显示到页面的课程有哪些
    },
}
// Module里的参数 1） 自己状态  2)全局状态
const home: Module<IHomeState, IGlobalState> = {
    namespaced: true,
    state,
    mutations:{
        [Types.SET_CATEGORY](state,payload:CATOGORY_TYPES){
            state.currentCategory = payload
        },
        [Types.SET_SLIDER_LIST](state,payload:ISlider[]){
            state.sliders = payload;
        },
        [Types.SET_LOADING](state,payload:boolean){
            state.lessons.loading = payload;
        },
        [Types.SET_LESSON_LIST](state,payload:ILessons){
            state.lessons.list = [...state.lessons.list,...payload.list];
            state.lessons.hasMore = payload.hasMore;
            state.lessons.offset = state.lessons.offset + payload.list.length;
        }
    },
    actions:{
        async [Types.SET_SLIDER_LIST]({commit}){
            let sliders = await getSliders<ISlider>();
            commit(Types.SET_SLIDER_LIST,sliders)
        },
        async [Types.SET_LESSON_LIST]({commit}){
            if(state.lessons.loading){
                return;
            }
            if(!state.lessons.hasMore){
                return
            }
            commit(Types.SET_LOADING,true); // 开始加载数据

            const lessons = await getLessons<ILessons>(state.currentCategory,state.lessons.offset,state.lessons.limit);

            commit(Types.SET_LESSON_LIST,lessons);
            commit(Types.SET_LOADING,false); // 开始加载数据


        }
    }
}


export default home