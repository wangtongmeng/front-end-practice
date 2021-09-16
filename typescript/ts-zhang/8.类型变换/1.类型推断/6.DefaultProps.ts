// DefaultProps

interface DefaultProps{
    name?:string;
    age?:number;
}
let defaultProps: DefaultProps = {
   name:'zhangsan',
   age:10
}

let props = {
    ...defaultProps,
    home:'北京'
}
type Props = typeof props;

export {}