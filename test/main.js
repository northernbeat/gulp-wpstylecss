/*global describe, it*/
"use strict";

var fs         = require("fs");
var should     = require("should");
var Vinyl      = require("vinyl");
var wpstylecss = require("../");

require("mocha");

delete require.cache[require.resolve("../")];


describe("gulp-wpstylecss", function () {
    it("should produce expected file from package.json", function (done) {
        var expectedFile = new Vinyl({
            path: "style.css",
            cwd: null,
            base: null,
            contents: fs.readFileSync("test/expected/default.style.css")
        });

        var stream = wpstylecss();

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            should.exist(newFile);
            should.exist(newFile.contents);

            String(newFile.path).should.equal(String(expectedFile.path));
            String(newFile.cwd).should.equal(String(expectedFile.cwd));
            String(newFile.base).should.equal(String(expectedFile.base));
            String(newFile.contents).should.equal(String(expectedFile.contents));

            done();
        });
    });

});
