import { v4 as uuidv4 } from 'uuid';
export const  getUuid=()=>{
    let uuid_taken=JSON.parse(localStorage.getItem('UUIDTAKEN'))
    //如果没有身份表示则生成ID
    if(!uuid_taken){
        //本地只存储一次
        uuid_taken=uuidv4()
        localStorage.setItem('UUIDTAKEN',JSON.stringify(uuid_taken))
    }
    return uuid_taken

}
