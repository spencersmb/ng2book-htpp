/**
 * YouTubeSearchComponent is a tiny app that will autocomplete search YouTube.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var rxjs_1 = require('rxjs');
exports.YOUTUBE_API_KEY = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
exports.YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
var loadingGif = (window.__karma__) ? '' : require('images/loading.gif');
var SearchResult = (function () {
    function SearchResult(obj) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && obj.videoUrl ||
            "https://www.youtube.com/watch?v=" + this.id;
    }
    return SearchResult;
})();
var YouTubeService = (function () {
    function YouTubeService(http, apiKey, apiUrl) {
        this.http = http;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }
    YouTubeService.prototype.search = function (query) {
        var params = [
            ("q=" + query),
            ("key=" + this.apiKey),
            "part=snippet",
            "type=video",
            "maxResults=10"
        ].join('&');
        var queryUrl = this.apiUrl + "?" + params;
        console.log(queryUrl);
        return this.http.get(queryUrl)
            .map(function (response) {
            return response.json().items.map(function (item) {
                return new SearchResult({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.high.url
                });
            });
        });
    };
    YouTubeService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(exports.YOUTUBE_API_KEY)),
        __param(2, core_1.Inject(exports.YOUTUBE_API_URL)), 
        __metadata('design:paramtypes', [http_1.Http, String, String])
    ], YouTubeService);
    return YouTubeService;
})();
exports.YouTubeService = YouTubeService;
exports.youTubeServiceInjectables = [
    core_1.bind(YouTubeService).toClass(YouTubeService),
    core_1.bind(exports.YOUTUBE_API_KEY).toValue(exports.YOUTUBE_API_KEY),
    core_1.bind(exports.YOUTUBE_API_URL).toValue(exports.YOUTUBE_API_URL)
];
var SearchBox = (function () {
    function SearchBox(youtube, el) {
        this.youtube = youtube;
        this.el = el;
        this.loading = new core_1.EventEmitter();
        this.results = new core_1.EventEmitter();
    }
    SearchBox.prototype.ngOnInit = function () {
        var _this = this;
        rxjs_1.Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map(function (e) { return e.target.value; })
            .filter(function (text) { return text.length > 1; })
            .debounceTime(250)
            .do(function () { return _this.loading.next(true); })
            .map(function (query) { return _this.youtube.search(query); })
            .switch()
            .subscribe(function (results) {
            _this.loading.next(false);
            _this.results.next(results);
        }, function (err) {
            console.log(err);
            _this.loading.next(false);
        }, function () {
            _this.loading.next(false);
        });
    };
    SearchBox = __decorate([
        core_1.Component({
            outputs: ['loading', 'results'],
            selector: 'search-box',
            template: "\n    <input type=\"text\" class=\"form-control\" placeholder=\"Search\" autofocus>\n  "
        }), 
        __metadata('design:paramtypes', [YouTubeService, core_1.ElementRef])
    ], SearchBox);
    return SearchBox;
})();
var SearchResultComponent = (function () {
    function SearchResultComponent() {
    }
    SearchResultComponent = __decorate([
        core_1.Component({
            inputs: ['result'],
            selector: 'search-result',
            template: "\n   <div class=\"col-sm-6 col-md-3\">\n      <div class=\"thumbnail\">\n        <img src=\"{{result.thumbnailUrl}}\">\n        <div class=\"caption\">\n          <h3>{{result.title}}</h3>\n          <p>{{result.description}}</p>\n          <p><a href=\"{{result.videoUrl}}\"\n                class=\"btn btn-default\" role=\"button\">Watch</a></p>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SearchResultComponent);
    return SearchResultComponent;
})();
exports.SearchResultComponent = SearchResultComponent;
var YouTubeSearchComponent = (function () {
    function YouTubeSearchComponent() {
    }
    YouTubeSearchComponent.prototype.updateResults = function (results) {
        this.results = results;
    };
    YouTubeSearchComponent = __decorate([
        core_1.Component({
            selector: 'youtube-search',
            directives: [SearchBox, SearchResultComponent],
            template: "\n  <div class='container'>\n      <div class=\"page-header\">\n        <h1>YouTube Search\n          <img\n            style=\"float: right;\"\n            *ngIf=\"loading\"\n            src='" + loadingGif + "' />\n        </h1>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"input-group input-group-lg col-md-12\">\n          <search-box\n             (loading)=\"loading = $event\"\n             (results)=\"updateResults($event)\"\n              ></search-box>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <search-result\n          *ngFor=\"#result of results\"\n          [result]=\"result\">\n        </search-result>\n      </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YouTubeSearchComponent);
    return YouTubeSearchComponent;
})();
exports.YouTubeSearchComponent = YouTubeSearchComponent;
//# sourceMappingURL=YouTubeSearchComponent.js.map