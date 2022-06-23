(function (func) {
    $.ajax({
        url: "/guichu/wordcloudAnalyse",
        type: "GET",
        dataType: "json",
        success: function (data) {
            func(data);
        }
    });
})(function (data) { //[{name:"",value:1.0}]
    console.log(data);
    // var myChart = echarts.init(document.getElementById('chart_guichu_wordcloud'), 'infographic');
    var chart = echarts3.init(document.getElementById('chart_guichu_wordcloud'));

    var maskImage = new Image();

    var option = {
        series: [ {
            type: 'wordCloud',
            sizeRange: [4, 150],
            rotationRange: [0, 0],
            gridSize: 0,
            shape: 'pentagon',
            maskImage: maskImage,
            drawOutOfBound: false,
            // layoutAnimation: true,
            keepAspect: true,
            textStyle: {
                fontWeight: 'bold',
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 200) + 50,
                        Math.round(Math.random() * 50),
                        Math.round(Math.random() * 50) + 50
                    ].join(',') + ')';
                }
            },
            emphasis: {
                textStyle: {
                    color: '#528'
                }
            },
            data: data.sort(function (a, b) {
                return b.value  - a.value;
            })
        } ]
    };

    maskImage.onload = function () {
        option.series[0].maskImage
        chart.setOption(option);
    }

    maskImage.src = './logo.png';

    window.onresize = function () {
        chart.resize();
    }
    

    // myChart.setOption(option);
    // window.addEventListener("resize", function () {
    //     myChart.resize();
    // });

});