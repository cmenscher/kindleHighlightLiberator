(function(w) {
    w.KHL = {
        used_asins: [],
        offset: null,
        totalHighlights: 0,
        imported: [],
        nextBookUrl: "https://kindle.amazon.com/your_highlights/next_book",

        getNextBook: function() {
            var _this = this;
            var urldata = {};

            if (_this.offset !== null) { //null for the first request --> don't need to send any params
                urldata = {
                    "used_asins[]": _this.used_asins,
                    "current_offset": _this.offset
                }
            }

            $.get(_this.nextBookUrl, urldata, function(src) {
                _this.process(src);
            }, "html");
        },

        process: function(src) {
            var _this = this;

            if (src === "") {
                _this.end();
                return true;
            }

            var $page = $(src);
            var book = $page.filter('.bookMain')[0];

            var title = $(book).find('.title a')[0];
            title = $(title).text();

            var id = $(book).attr("id").split("_");
            var asin = id[0];
            _this.offset = id[1];
            _this.used_asins.push(asin);

            var highlights = $page.filter('.yourHighlight');
            var highlightedText = [];
            $.each(highlights, function(n) {
                var loc = $(highlights[n]).find('a.readMore').attr('href');
                var kindleLoc = loc.match(/location=(\d+)/)[1];
                highlightedText.push({
                    'content': $(highlights[n]).find('.highlight').text(),
                    'comment': $(highlights[n]).find('.noteContent').text(),
                    'kindleLocation': kindleLoc
                });
            });

            var bookdata = {
                'asin': asin,
                'title': title,
                'highlightedText': highlightedText,
                'cover': "http://images.amazon.com/images/P/" + asin + ".01.TZZ.jpg",
            }

            _this.progress(bookdata);
            _this.getNextBook();
        },

        progress: function(bookdata) {
            var _this = this;
            var coverImg = "http://images.amazon.com/images/P/" + bookdata.asin + ".01.TZZ.jpg";

            _this.totalHighlights += bookdata.highlightedText.length;
            var word = "highlight";
            if(bookdata.highlightedText.length > 1) {
                word = word+"s";
            }

            _this.imported.unshift(bookdata);

            $("#cv").html("<img src='" + coverImg + "'>");
            $("#cb").html(bookdata.highlightedText.length + " " + word + " from \"" + bookdata.title + "\"");
        },

        saveData: function (data, fileName) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        },

        end: function() {
            var _this = this;

            var currentdate = new Date(); 
            var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() + "-" + currentdate.getDate();
            var filename = "kindle_highlights_" + datetime + ".json";

            var data = {};
            data.totalHighlights = _this.totalHighlights;
            data.highlights = _this.imported;

            _this.saveData(data, filename);
 
            $("#khl").remove();
            delete window.KHL;

            // console.log("Highlights import complete!");
        },

        start: function() {
            var _this = this;

            if(window.location.href != "https://kindle.amazon.com/your_highlights") { 
                if(confirm("You must be logged into http://kindle.amazon.com/your_highlights to save your highlights. Go there now?")) {
                    window.location.href = "https://kindle.amazon.com/your_highlights";
                } else {
                    return false;
                }
            } else {
                _this.getNextBook();
                $("body").prepend("<div id='khl' style='position: fixed; width: 100%; height: 120px; background-color: rgba(100, 100, 100, .75); border: 1px solid black; z-index: 1000;'><div style='display: block; position: relative; margin: 0px 0px 0px 50px; height: 100%; line-height: 120px; font-size: 18px; color: white;'><span id='cv' style='display: inline-block; width: 75px; height: 110px; margin: 5px 25px 5px 0px;'></span><span id='cb' style='display: inline-block; position: absolute; margin: auto; height: 100%; line-height: 120px;'>IMPORTING HIGHLIGHTS...</span></div></div>");
                // console.log("Highlights import has begun...");
            }
        }
    }
})(window);
KHL.start(); 