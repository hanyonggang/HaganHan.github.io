
module.exports={
    entry:"./mo-music_wire_text/js/modules/music_wire_text.js",
    output:{
        path:"./mo-music_wire_text/js",
        filename:"music_wire_text.webpack.js"
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