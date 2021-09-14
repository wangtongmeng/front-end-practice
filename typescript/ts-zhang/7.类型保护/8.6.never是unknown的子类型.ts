// never是unknown的子类型
type isNever = never extends unknown ? true : false;
export {}