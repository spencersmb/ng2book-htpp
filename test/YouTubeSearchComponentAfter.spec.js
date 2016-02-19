/// <reference path="../typings/karma-read-json.d.ts" />
var core_1 = require('angular2/core');
var testing_1 = require('angular2/testing');
var testing_2 = require('angular2/http/testing');
var http_1 = require('angular2/http');
var YouTubeSearchComponent_1 = require('../app/ts/components/YouTubeSearchComponent');
testing_1.describe('MoreHTTPRequests (after)', function () {
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
        function search(term, response, callback) {
            return testing_1.inject([YouTubeSearchComponent_1.YouTubeService, testing_2.MockBackend], testing_1.fakeAsync(function (service, backend) {
                var req;
                var res;
                backend.connections.subscribe(function (c) {
                    req = c.request;
                    c.mockRespond(new http_1.Response({ body: response }));
                });
                service.search(term).subscribe(function (_res) {
                    res = _res;
                });
                testing_1.tick();
                callback(req, res);
            }));
        }
        var response = readJSON('test/fixture/youtube-response.json');
        testing_1.it('parses YouTube video id', search('hey', response, function (req, res) {
            var video = res[0];
            testing_1.expect(video.id).toEqual('VIDEO_ID');
        }));
        testing_1.it('parses YouTube video title', search('hey', response, function (req, res) {
            var video = res[0];
            testing_1.expect(video.title).toEqual('TITLE');
        }));
        testing_1.it('parses YouTube video description', search('hey', response, function (req, res) {
            var video = res[0];
            testing_1.expect(video.description).toEqual('DESCRIPTION');
        }));
        testing_1.it('parses YouTube video thumbnail', search('hey', response, function (req, res) {
            var video = res[0];
            testing_1.expect(video.description).toEqual('DESCRIPTION');
        }));
        testing_1.it('sends the query', search('term', response, function (req, res) {
            testing_1.expect(req.url).toContain('q=term');
        }));
        testing_1.it('sends the API key', search('term', response, function (req, res) {
            testing_1.expect(req.url).toContain('key=YOUTUBE_API_KEY');
        }));
        testing_1.it('uses the provided YouTube URL', search('term', response, function (req, res) {
            testing_1.expect(req.url).toMatch(/^YOUTUBE_API_URL\?/);
        }));
    });
});
//# sourceMappingURL=YouTubeSearchComponentAfter.spec.js.map