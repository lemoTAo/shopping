
export const  routes=[
     {
        path:'*',
        //从定向，没有指定默认问
        redirect:"/home",
        component:()=>import('@/pages/Home')
       
    }
    ,{
        path:'/home', 
        name:'Home',
       component:()=>import('@/pages/Home'),
        meta:{
            show:true//显示footer组件是否显示 
        }
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('@/pages/Login'),
    
    },
    {
        path:'/register',
        component:()=>import('@/pages/Register')
    },
    {
        path: "/search/:skuId?",
        component:()=>import('../pages/Search') ,
        meta:{
            show:true
        },
        name:"Search",
       
    },
    {
        path:'/detail/:skuId?',
        name:'Detail',
        component:()=>import('../pages/Detail')  
    },
    {
        path:'/shopCart',
        name:'ShopCart',
        component:()=>import('../pages/ShopCart'),
        meta:{
            show:true
        }
    },{
        path:'/AddCartSuccess',
        name:'AddCartSuccess',
        component:()=>import('../pages/AddCartSuccess'),
        meta:{
            show:true
        }
    },
    {
        path:'/trade',
        name:'Trade',
        component:()=>import('@/pages/Trade'),
        //路由组件负责自己的部分，防止专业人士，乱跳转
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart')
            {
                next()
            }
            else{
                next(false)
            }
        }
    },{
        path:'/pay/:orderId?',
        name:'Pay',
        component:()=>import('@/pages/Pay'),
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade')
            {
                next()
            }
            else{
                next(false)
            }
        }
    }
    ,{
        path:'/paySuccess',
        name:'PaySuccess',
        component:()=>import('@/pages/PaySuccess'),
        beforeEnter: (to, from, next) => {
            console.log(from.path);
            
            if(from.path.indexOf('/pay')!=-1)
            {
                next()
            }
            else{
                next(false)
            }
        }
    }
    ,{
        path:'/center',
        name:'Center',
        component:()=>import('@/pages/Center'),
        children:[
            {
                path:'myOrder',
                name:'MyOrder',
                component:()=>import('@/pages/Center/myOrder'),
            },
            {
                path:'groupOrder',
                name:'GroupOrder',
                component:()=>import('@/pages/Center/groupOrder'),
            },{
                path:'/center',
                //重定向默认打开
                redirect:'/center/myOrder',
                component:()=>import('@/pages/Center/myOrder'),
            }
        ]
    }
   
]
