## CompositionAPI 中如何使用 VueX
```js
setup(){
    const store = useStore()
    const { name } = toRefs(store.state)
    const handleClick = () => {
        store.dispatch('getData')
    }
    return { name, handleClick }
}
```