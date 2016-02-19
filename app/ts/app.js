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
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var SimpleHTTPComponent_1 = require('./components/SimpleHTTPComponent');
var MoreHTTPRequests_1 = require('./components/MoreHTTPRequests');
var YouTubeSearchComponent_1 = require('./components/YouTubeSearchComponent');
var YouTubeSearchComponent_2 = require('./components/YouTubeSearchComponent');
require('css/styles.scss');
var HttpApp = (function () {
    function HttpApp() {
    }
    HttpApp = __decorate([
        core_1.Component({
            selector: 'http-app',
            directives: [
                SimpleHTTPComponent_1.SimpleHTTPComponent,
                MoreHTTPRequests_1.MoreHTTPRequests,
                YouTubeSearchComponent_1.YouTubeSearchComponent
            ],
            template: "\n  <div class=\"container\">\n    <simple-http></simple-http>\n    <hr/>\n    <more-http></more-http>\n    <hr/>\n    <youtube-search></youtube-search>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HttpApp);
    return HttpApp;
})();
browser_1.bootstrap(HttpApp, [
    http_1.HTTP_PROVIDERS,
    YouTubeSearchComponent_2.youTubeServiceInjectables
]);
//# sourceMappingURL=app.js.map