export function createRouteMap(routes,routesOptions = {}) {
    let pathMap = routesOptions;
    routes.forEach(route => {
        addRouteRecord(route, pathMap);
    });
    return {
        pathMap
    }
}
// 构建父子关系 ， 稍后路径匹配的时候 /about/a -> 这个路径对应的记录，看记录中有没有parent，如果有将parent的记录也找到 [parentRecord，childRecord]
export const addRouteRecord = (route, pathMap, parent) => {
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = {
        path: route.path, // 为了儿子能拿到父亲的路径
        name: route.name,
        component: route.component,
        parent
    }
    if (!pathMap[path]) { // 防止同一个路径 多次进行注册
        pathMap[path] = record
    }
    if (route.children) {
        route.children.forEach(child => {
            addRouteRecord(child, pathMap, record)
        });
    }
}