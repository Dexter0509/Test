$(function () {
    // 封装ajax函数
    function update(url, formdata, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: formdata,
            dataType: "json",
            processData: false, // jQuery不要去处理发送的数据
            contentType: false,
            success: function (data) {
                callback(data);
            },
            error: function (err) {
                console.log("服务器错误！", err);
                $("span").text("服务器错误,请重新上传！")
            },

        })
    }
    // 执行input时间时调用
    $("input").change(function () {
        var imgSize = 4000000
        var zzz = /\.(jpg|png|jpeg|bmp)/i
        var str = this.files[0].name
        var sizes = this.files[0].size
        var last = str.lastIndexOf('.')
        var jq = str.substring(last, last.length).toLowerCase();
        if (zzz.test(jq) && sizes <= imgSize) {
            var url = "http://10.122.248.149:3000/picture"
            var imgFiles = $("#pic")[0].files[0]
            var formdata = new FormData()
            formdata.append("imges", imgFiles)
            update(url, formdata, function (data) {
                // console.log(data);
                // console.log(this.result);
                if (data.code < 0) {
                    $("span").text(data.msg)
                }
                $("span").text(data.msg)
                var localsto = window.localStorage
                localStorage.setItem("src", data.urls)
                $('.imgbox img').attr('src', localsto.src);

            })

        } else {
            alert("请选择一张正确的图片并且大小不能大于4M")
        }
    })

    // 将服务端返回的数据保存在localStorage中
    // window.onload = function () {
    //     var localsto = window.localStorage
    //     $('.imgbox img').attr('src', localsto.src);
    // }
})


var data;
var length;

$.ajax({
    type: "POST",
    url: "http://10.122.248.149:3000/url",
    dataType: "JSON",
    processData: false, // jQuery不要去处理发送的数据
    contentType: false,
    success: function (res) {
        data = res;
        length = data.length;
        // console.log(length)
        for (var i = 1; i < data.length + 1; i++) {

            var div1 = document.createElement('div');
            div1.id = "label";
            var main = document.getElementById('main-section');

            main.appendChild(div1);

            var div2 = document.createElement('div');
            div2.id = "photo" + i;
            div2.className = "photo";
            div2.innerHTML = i;
            // div2.backgroundImage = "url('./public/1680767232593.jpg')";
            div2.style.backgroundImage = `url(${data[i - 1].url})`;
            div1.appendChild(div2);

            // console.log(data[i].url);

            var div3 = document.createElement('div');
            div1.appendChild(div3);
            div3.id = "little-label" + i;
            div3.className = "little-label";

            document.getElementById("little-label" + i).ondrop = function drop(ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("Text");

                var button = ev.target.appendChild(document.getElementById(data).cloneNode(true));
                button.className = 'button';

                var delectBtn = document.createElement('b');
                delectBtn.className = 'delect'
                delectBtn.innerHTML = 'x';
                button.appendChild(delectBtn);
                delectBtn.addEventListener("click", function (e) {
                    delectBtn.parentNode.parentNode.removeChild(delectBtn.parentNode);
                });

            };

            document.getElementById("little-label" + i).ondragover = function allowDrop(ev) {
                ev.preventDefault();
            };

        }

    },
    err: function () {
        console.log("cuowu")
    }
});

var data2;
var delet = new Array();
$.ajax({
    type: "POST",
    url: "http://10.122.248.149:3000/get",
    dataType: "JSON",
    processData: false, // jQuery不要去处理发送的数据
    contentType: false,
    error: function () {
        console.log("错误");
    },
    success: function (res) {
        data2 = res;
        console.log(data2);

        for (let i = 1; i < length + 1; i++) {

            var delettag = new Object();
            delettag.id = i;

            if (data2[i - 1].form != null) {

                var name1 = "div1" + i;
                var b1 = "b1" + i

                var txt = data2[i - 1].form
                var name1 = document.createElement(name1);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name1);
                name1.className = "button";
                name1.innerHTML = `${txt}`;

                var delectBtna = document.createElement(b1);
                delectBtna.className = 'delect'
                delectBtna.innerHTML = 'x';
                name1.appendChild(delectBtna);
                delectBtna.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].form = null;
                });
            }
            if (data2[i - 1].nature != null) {
                var name2 = "div2" + i;
                var b2 = "b2" + i

                var txt = data2[i - 1].nature
                var name2 = document.createElement(name2);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name2);
                name2.className = "button";
                name2.innerHTML = `${txt}`;

                var delectBtnb = document.createElement(b2);
                delectBtnb.className = 'delect'
                delectBtnb.innerHTML = 'x';
                name2.appendChild(delectBtnb);
                delectBtnb.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].nature = null;
                });
            }
            if (data2[i - 1].binding != null) {
                var name3 = "div3" + i;
                var b3 = "b3" + i

                var txt = data2[i - 1].binding
                var name3 = document.createElement(name3);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name3);
                name3.className = "button";
                name3.innerHTML = `${txt}`;

                var delectBtnc = document.createElement(b3);
                delectBtnc.className = 'delect'
                delectBtnc.innerHTML = 'x';
                name3.appendChild(delectBtnc);
                delectBtnc.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].binding = null;
                });
            }
            if (data2[i - 1].flow != null) {
                var name4 = "div4" + i;
                var b4 = "b4" + i;

                var txt = data2[i - 1].flow
                var name4 = document.createElement(name4);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name4);
                name4.className = "button";
                name4.innerHTML = `${txt}`;

                var delectBtnd = document.createElement(b4);
                delectBtnd.className = 'delect'
                delectBtnd.innerHTML = 'x';
                name4.appendChild(delectBtnd);
                delectBtnd.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].flow = null;
                });
            }
            if (data2[i - 1].symmetry != null) {
                var name5 = "div5" + i;
                var b5 = "b5" + i;

                var txt = data2[i - 1].symmetry
                var name5 = document.createElement(name5);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name5);
                name5.className = "button";
                name5.innerHTML = `${txt}`;

                var delectBtne = document.createElement(b5);
                delectBtne.className = 'delect'
                delectBtne.innerHTML = 'x';
                name5.appendChild(delectBtne);
                delectBtne.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].symmetry = null;
                });
            }
            if (data2[i - 1].locale != null) {
                var name6 = "div6" + i;
                var b6 = "b6" + i;

                var txt = data2[i - 1].locale
                var name6 = document.createElement(name6);
                var div2 = document.getElementById("little-label" + i);
                div2.appendChild(name6);
                name6.className = "button";
                name6.innerHTML = `${txt}`;

                var delectBtnf = document.createElement(b6);
                delectBtnf.className = 'delect'
                delectBtnf.innerHTML = 'x';
                name6.appendChild(delectBtnf);
                delectBtnf.addEventListener("click", function (e) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    delet[i - 1].locale = null;
                });
            }

            delet.push(delettag);

        }
    }
});



var finals;
var final = new Array();
function upload() {
    //console.log(final);
    for (i = 1; i < length + 1; i++) {
        // 查询每个little-label下的标签.button并形成对象，同时和id一起嵌套对象
        var form;
        var nature;
        var binding;
        var flow;
        var symmetry;
        var locale;

        var insert = new Object();
        insert.id = i;

        if ($(`#little-label${i}`).find("#screening1").length > 0) {
            form = $("#screening1").text();
            insert.form = form;
        } else if ($(`#little-label${i}`).find("#screening2").length > 0) {
            form = $("#screening2").text();
            insert.form = form;
        } else if ($(`#little-label${i}`).find("#screening3").length > 0) {
            form = $("#screening3").text();
            insert.form = form;
        } else if ($(`#little-label${i}`).find("#screening4").length > 0) {
            form = $("#screening4").text();
            insert.form = form;
        }

        if ($(`#little-label${i}`).find("#screening5").length > 0) {
            nature = $("#screening5").text();
            insert.nature = nature;
        } else if ($(`#little-label${i}`).find("#screening6").length > 0) {
            nature = $("#screening6").text();
            insert.nature = nature;
        } else if ($(`#little-label${i}`).find("#screening7").length > 0) {
            nature = $("#screening7").text();
            insert.nature = nature;
        } else if ($(`#little-label${i}`).find("#screening8").length > 0) {
            nature = $("#screening8").text();
            insert.nature = nature;
        }

        if ($(`#little-label${i}`).find("#screening9").length > 0) {
            binding = $("#screening9").text();
            insert.binding = binding;
        } else if ($(`#little-label${i}`).find("#screening10").length > 0) {
            binding = $("#screening10").text();
            insert.binding = binding;
        } else if ($(`#little-label${i}`).find("#screening11").length > 0) {
            binding = $("#screening11").text();
            insert.binding = binding;
        } else if ($(`#little-label${i}`).find("#screening12").length > 0) {
            binding = $("#screening12").text();
            insert.binding = binding;
        }

        if ($(`#little-label${i}`).find("#screening13").length > 0) {
            flow = $("#screening13").text();
            insert.flow = flow;
        } else if ($(`#little-label${i}`).find("#screening14").length > 0) {
            flow = $("#screening14").text();
            insert.flow = flow;
        }

        if ($(`#little-label${i}`).find("#screening15").length > 0) {
            symmetry = $("#screening15").text();
            insert.symmetry = symmetry;
        } else if ($(`#little-label${i}`).find("#screening16").length > 0) {
            symmetry = $("#screening16").text();
            insert.symmetry = symmetry;
        } else if ($(`#little-label${i}`).find("#screening17").length > 0) {
            symmetry = $("#screening17").text();
            insert.symmetry = symmetry;
        } else if ($(`#little-label${i}`).find("#screening18").length > 0) {
            symmetry = $("#screening18").text();
            insert.symmetry = symmetry;
        }

        if ($(`#little-label${i}`).find("#screening19").length > 0) {
            locale = $("#screening19").text();
            insert.locale = locale;
        } else if ($(`#little-label${i}`).find("#screening20").length > 0) {
            locale = $("#screening20").text();
            insert.locale = locale;
        } else if ($(`#little-label${i}`).find("#screening21").length > 0) {
            locale = $("#screening21").text();
            insert.locale = locale;
        }

        final.push(insert);
        finals = final;

    }
    console.log(delet)

    console.log(finals);
    $.ajax({
        url: "http://10.122.248.149:3000/tags",
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(finals),
        processData: false, // 使数据不做处理
        contentType: "application/json; charset=UTF-8",
        error: function () {
            console.log("错误");
        },
        success: function (res) {
            console.log("正确")
        }
    });

    $.ajax({
        url: "http://10.122.248.149:3000/delect",
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(delet),
        processData: false, // 使数据不做处理
        contentType: "application/json; charset=UTF-8",
        error: function () {
            console.log("错误");
        },
        success: function () {
            console.log(delet)
        }
    });

    location.reload();
}






