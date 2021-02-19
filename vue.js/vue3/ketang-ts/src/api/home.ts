import { ISlider } from '@/typings'
import axios from './index'

export function getSliders<T>() {
    return axios.get<T,T>('/slider/list')
}