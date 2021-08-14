import { CATOGORY_TYPES } from '@/typings';
import axios from './index';

// 声明获取轮播图的接口api
export function getSliders<T>() {
    return axios.get<T, T>('/slider/list');
}


export function getLessons<T>(
    category: CATOGORY_TYPES,
    offset: number = 0,
    limit: number = 5) {
    return axios.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}