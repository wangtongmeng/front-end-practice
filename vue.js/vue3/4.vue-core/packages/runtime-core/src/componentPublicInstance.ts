import { hasOwn } from "@vue/shared";

export const componentPublicInstance = {
    get({ _: instance }, key) {
        const { setupState, props ,ctx} = instance;

        if (hasOwn(setupState, key)) { // 先自己的状态 在像上下文中查找，在像属性中查找
            return setupState[key];
        }else if (hasOwn(ctx, key)) {
            return ctx[key];
        } else if (hasOwn(props, key)) {
            return props[key];
        }
    },
    set({ _: instance }, key, value) {
        const { setupState, props } = instance;
        if (hasOwn(setupState, key)) {
            setupState[key] = value;
        }  else if (hasOwn(props, key)) {
            props[key] = value
        }
        return true;
    }
}