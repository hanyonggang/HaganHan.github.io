
const moWebGl={

    //得到归一化的坐标X
    fnGetNormalizationX(childX, parWidth) {
        return ( childX / parWidth ) * 2 - 1;
    },

    //得到归一化的坐标Y
    fnGetNormalizationY(childY, parHeight) {
        return -( childY / parHeight ) * 2 + 1;
    },



};

export {moWebGl};