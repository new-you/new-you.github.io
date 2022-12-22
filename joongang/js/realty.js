$(document).ready(function($) {
    chart1 = c3.generate({
        bindto: '#chart1',
        data: {
            columns: [
                ['data1', 55.6, 33.7], 
                ['data2', 0, 5.6],
                ['data3', 5.6, -16.9]
            ],
            names: {
                data1: '교육',
                data2: '교통',
                data3: '경과년수'
            },
            colors: {
                data1: '#15136a',
                data2: '#d2d2d2',
                data3: '#7e8aa5'
            },
            type : 'bar'
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                categories: ['강남3구', '그 외']
            }
        },
        grid: {
            y: {
                lines: [{value: 0}]
            }
        }
    });

    chart2 = c3.generate({
        bindto: '#chart2',
        data: {
            columns: [
                ['data1', 0],
                ['data2', 73.4]
            ],
            names: {
                data1: '강남구',
                data2: '그 외'
            },
            colors: {
                data1: '#364e5c',
                data2: '#a8a8a8'
            },
            type : 'pie',
            labels: false
        },
    });

    chart3 = c3.generate({
        bindto: '#chart3',
        data: {
            columns: [
                ['data1', -13.85],
                ['data2', 17.62],
                ['data3', 15.54],
                ['data4', 37.19],
                ['data5', 59.29],
            ],
            names: {
                data1: '그 외 21개구',
                data2: '양천구',
                data3: '송파구',
                data4: '서초구',
                data5: '강남구',
            },
            colors: {
                data1: '#d2d2d2',
                data2: '#858585',
                data3: '#a0a0a0',
                data4: '#85704d',
                data5: '#364e5c'
            },
            type : 'bar'
        },
        axis: {
            rotated: true,
            x: {
                show: false,
                type: 'category',
                categories: ['인구증감율']
            }
        },
        grid: {
            y: {
                lines: [{value: 0}]
            }
        }
    });
    tableSetting(0);
    $(".btn_change input").on("click", function(){
        var chk = $(this).is(':checked');
        if(!chk) {
            tableSetting(0); //국제중학교 제외
        }else{
            tableSetting(1); //국제중학교 포함하기
        }
    });
});



function tableSetting(num) {

    var table = $(".tb_school table");
    var data = [
        [
            { rank: "1", name: "신사중학교", area: "강남구", percent: "48.6", pointChk : "Y"}
            ,{ rank: "2", name: "압구정중학교", area: "강남구", percent: "47.6", pointChk : "Y"}
            ,{ rank: "3", name: "숭문중학교", area: "마포구", percent: "46.1"}
            ,{ rank: "4", name: "휘문중학교", area: "강남구", percent: "44.8", pointChk : "Y"}
            ,{ rank: "5", name: "양정중학교", area: "양천구", percent: "41.5"}
            ,{ rank: "6", name: "경희중학교", area: "동대문구", percent: "41.2"}
            ,{ rank: "7", name: "경원중학교", area: "서초구", percent: "40.5", pointChk : "Y"}
            ,{ rank: "8", name: "신동중학교", area: "서초구", percent: "39.9", pointChk : "Y"}
            ,{ rank: "9", name: "광성중학교", area: "마포구", percent: "37.5"}
            ,{ rank: "10", name: "세화여자중학교", area: "서초구", percent: "34.5", pointChk : "Y"}
        ],
        [
            { rank: "1", name: "영훈국제중학교", area: "강북구", percent: "77.4"}
            ,{ rank: "2", name: "대원국제중학교", area: "광진구", percent: "68.9"}
            ,{ rank: "3", name: "신사중학교", area: "강남구", percent: "48.6", pointChk : "Y"}
            ,{ rank: "4", name: "압구정중학교", area: "강남구", percent: "47.6", pointChk : "Y"}
            ,{ rank: "5", name: "숭문중학교", area: "마포구", percent: "46.1"}
            ,{ rank: "6", name: "휘문중학교", area: "강남구", percent: "44.8", pointChk : "Y"}
            ,{ rank: "7", name: "양정중학교", area: "양천구", percent: "41.5"}
            ,{ rank: "8", name: "경희중학교", area: "동대문구", percent: "41.2"}
            ,{ rank: "9", name: "경원중학교", area: "서초구", percent: "40.5", pointChk : "Y"}
            ,{ rank: "10", name: "신동중학교", area: "서초구", percent: "39.9", pointChk : "Y"}
        ]
    ];

    run();

    function run(){
        var html = '';
        var len = data[num].length;
        
        table.find("tbody").remove();
        table.append('<tbody>');

        for (var i=0; i < len; i++) {
            var d = data[num][i];
            html += '<tr>' + 
            '<td>' + d.rank + '</td>' +
            '<td>' + d.name + '</td>' +
            '<td>' + d.area + '</td>' +
            '<td>' + d.percent + '</td>' +
            '</tr>';
        }
        table.append(html);
        table.append('</tbody>');
    }
}


function chartSetting(num){
    $(".chart_area button").siblings().removeClass("on").eq(num).addClass("on");
    if(num === 1) {
        if(is_mobile){
            $(".txt_chart").html("※ 특목 ·자사고 평균 진학률 이상 중학교 중<br>강남3구 비중 (총 143개 중학교)");
        }else{
            $(".txt_chart").text("※ 특목 ·자사고 평균 진학률 이상 중학교 중 강남3구 비중 (총 143개 중학교)");
        }
        chart2.load({
            columns: [
                ['data1', 26.6],
                ['data2', 73.4]
            ]
        });
    } else {
        $(".txt_chart").text("※ 서울시 전체 중학교 381개 중");
        chart2.load({
            columns: [
                ['data1', 17.1],
                ['data2', 82.9]
            ]
        });
    }
}

function setClass(item , cl , dt){  
    setTimeout( function(){ 
        item.addClass(cl);
    } , dt)
}