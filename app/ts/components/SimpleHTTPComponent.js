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
var http_1 = require('angular2/http');
var SimpleHTTPComponent = (function () {
    function SimpleHTTPComponent(http) {
        this.http = http;
    }
    SimpleHTTPComponent.prototype.makeRequest = function () {
        var _this = this;
        this.loading = true;
        this.http.request('http://jsonplaceholder.typicode.com/posts/1')
            .subscribe(function (res) {
            _this.data = res.json();
            _this.loading = false;
        });
    };
    SimpleHTTPComponent = __decorate([
        core_1.Component({
            selector: 'simple-http',
            template: "\n  <h2>Basic Request</h2>\n  <button type=\"button\" (click)=\"makeRequest()\">Make Request</button>\n  <div *ngIf=\"loading\">loading...</div>\n  <pre>{{data | json}}</pre>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SimpleHTTPComponent);
    return SimpleHTTPComponent;
})();
exports.SimpleHTTPComponent = SimpleHTTPComponent;
//# sourceMappingURL=SimpleHTTPComponent.js.map