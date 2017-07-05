
module.exports={
    entry:"./js/modules/index.js",
    output:{
        path:"./js",
        filename:"index.webpack.js"
    },
    module:{
        loaders:[
            {
                test:/\.js/,
                loader:"babel",
                include:`${__dirname}`
            },
            {
                test:/\.css/,
                loaders:[
                    "style-loader",
                    "css-loader"
                ],
                include:`${__dirname}`
            }
        ]

    }
};