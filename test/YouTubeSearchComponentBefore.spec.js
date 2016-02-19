var core_1 = require('angular2/core');
var testing_1 = require('angular2/testing');
var testing_2 = require('angular2/http/testing');
var http_1 = require('angular2/http');
var YouTubeSearchComponent_1 = require('../app/ts/components/YouTubeSearchComponent');
testing_1.describe('MoreHTTPRequests (before)', function () {
    testing_1.beforeEachProviders(function () {
        return [
            YouTubeSearchComponent_1.YouTubeService,
            http_1.BaseRequestOptions,
            testing_2.MockBackend,
            core_1.provide(YouTubeSearchComponent_1.YOUTUBE_API_KEY, { useValue: 'YOUTUBE_API_KEY' }),
            core_1.provide(YouTubeSearchComponent_1.YOUTUBE_API_URL, { useValue: 'YOUTUBE_API_URL' }),
            core_1.provide(http_1.Http, { useFactory: function (backend, defaultOptions) {
                    return new http_1.Http(backend, defaultOptions);
                }, deps: [testing_2.MockBackend, http_1.BaseRequestOptions] }),
        ];
    });
    testing_1.describe('search', function () {
        testing_1.it('parses YouTube response', testing_1.inject([YouTubeSearchComponent_1.YouTubeService, testing_2.MockBackend], testing_1.fakeAsync(function (service, backend) {
            var res;
            backend.connections.subscribe(function (c) {
                c.mockRespond(new http_1.Response({
                    body: "\n            {\n              \"items\": [\n                {\n                  \"id\": { \"videoId\": \"VIDEO_ID\" },\n                  \"snippet\": {\n                    \"title\": \"TITLE\",\n                    \"description\": \"DESCRIPTION\",\n                    \"thumbnails\": {\n                      \"high\": { \"url\": \"THUMBNAIL_URL\" }\n                    }\n                  }\n                }\n              ]\n            }\n            "
                }));
            });
            service.search('hey').subscribe(function (_res) {
                res = _res;
            });
            testing_1.tick();
            var video = res[0];
            testing_1.expect(video.id).toEqual('VIDEO_ID');
            testing_1.expect(video.title).toEqual('TITLE');
            testing_1.expect(video.description).toEqual('DESCRIPTION');
            testing_1.expect(video.thumbnailUrl).toEqual('THUMBNAIL_URL');
        })));
    });
});
//# sourceMappingURL=YouTubeSearchComponentBefore.spec.js.map