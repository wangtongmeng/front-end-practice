// 可辨识的联合类型
/* 
就是利用联合类型中的共有字段进行类型保护的一种技巧
相同字段的不同取值就是可辨识
*/

interface WarningButton {
    class: 'warning',
    text1: '修改'
}
interface DangerButton {
    class: 'danger',
    text2: '删除'
}
type Button = WarningButton | DangerButton;
function getButton(button: Button) {
    if (button.class == 'warning') {
        console.log(button.text1);
    }
    if (button.class == 'danger') {
        console.log(button.text2);
    }
}


// 类型字面量+可辨识联合类型
interface User {
    username: string
}
type Action = {
    type: 'add',
    payload: User
} | {
    type: 'delete'
    payload: number
}
const UserReducer = (action: Action) => {
    switch (action.type) {
        case "add":
            let user: User = action.payload;
            break;
        case "delete":
            let id: number = action.payload;
            break;
        default:
            break;
    }
};

export { }