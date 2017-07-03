
const path=require("path");

module.exports={
    entry:{//打包的入口文件
        index:"./js/modules/index.js"
    },
    output:{//配置打包结果
        path:"./js",//定义输出文件路径
        filename:"[name].webpack.js"//指定打包文件名称
    },
    module:{//定义对模块的处理逻辑
        loaders:[//定义一系列的加载器
            {
                test:/\.js/,//处理什么文件
                loaders:[//加载器
                    "babel"
                ],
                // include:path.resolve(__dirname,"public/js"),//包含路径
                exclude:"/node_modules/"//排除路径
            },
            {
                test:/\.jsx/,//处理什么文件
                loaders:[//加载器
                    "react-hot",
                    "babel?presets[]=es2015&presets[]=react"
                ],
                // include:path.resolve(__dirname,"public"),//包含路径
                exclude:"/node_modules/"//排除路径
            },
            {
                test:/\.less/,
                loaders:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
                // include:path.resolve(__dirname,"public/less"),//包含路径
                exclude:"/node_modules/"//排除路径
            },
            {
                test:/\.css/,
                loaders:[
                    "style-loader",
                    "css-loader"
                ],
                // include:path.resolve(__dirname,"public/css"),//包含路径
                exclude:"/node_modules/"//排除路径
            }
        ]
    },
    resolve:{
        extensions:["",".js",".css",".jsx"]//自动补全识别后缀
    }
};