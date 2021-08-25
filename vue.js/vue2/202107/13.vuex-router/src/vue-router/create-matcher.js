import { createRouteMap } from "./creater-route-map";
export const createRoute = (record, { path }) => {
    let matched = [];
    if (record){
        while (record) { // 有记录将自己插入到队列的头部
            matched.unshift(record);
            record = record.parent; // 一层层的向上找
        }
    }
    return {
        path,
        matched
    }
}
export function createMatcher(routes) { // 匹配器 
    const { pathMap } = createRouteMap(routes); // 创建一个 路径和记录的映射表
    function addRoutes(routes) { // 在原来的基础上继续添加路由
        createRouteMap(routes, pathMap);
    }
    function match(location) { // 给我传递个路径 你帮我去匹配
        let record = pathMap[location]; // 根据路径找到一个匹配的数组
        if (record) {
            return createRoute(record, { path: location })
        }
        return createRoute(null, { path: location })
    }
    // 一个路径对应的记录是谁，这个记录有没有父亲 有父亲也要创造一个关联

    return {
        addRoutes, 
        match
    }
}