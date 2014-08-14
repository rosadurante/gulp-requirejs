var grjs   = require('../'),
    should = require('should'),
    fs     = require('fs'),
    gutil  = require('gulp-util');

require('mocha');


describe('gulp-requirejs', function() {

    describe('simple AMD file', function() {

        it('should concat the files in the correct order', function(done) {
            var stream = grjs({
                out: 'simple_init.js',
                baseUrl: 'test/fixtures/',
                findNestedDependencies: true,
                skipPragmas: true,
                name: 'simple_init',
                include: ['simple_init'],
                optimize: 'none',
                create: true
            });

            stream.on('end', function () {
                var output = fs.readFileSync('simple_init.js', 'utf8');
                var expected = fs.readFileSync('test/expected/simple_init.js', 'utf8');
                output.should.equal(expected);
            });

            done();
        });
    });

    describe('AMD und UMD mix', function() {

        it('should concat the files in the correct order', function(done) {
            var stream = grjs({
                out: 'umd_init.js',
                baseUrl: 'test/fixtures/',
                findNestedDependencies: true,
                skipPragmas: true,
                name: 'umd_init',
                include: ['umd_init'],
                optimize: 'none',
                create: true
            });

            stream.on('end', function () {
                var output = fs.readFileSync('umd_init.js', 'utf8');
                var expected = fs.readFileSync('test/expected/umd_init.js', 'utf8');
                output.should.equal(expected);
            });

            done();
        });

    });

    describe('amd file with shim', function() {
        it('should concat the files in the correct order, and build wrappers for the shimmed files', function(done) {
            var stream = grjs({
                out: 'complex_init.js',
                baseUrl: 'test/fixtures/vendor',
                findNestedDependencies: true,
                skipPragmas: true,
                name: '../complex_init',
                include: ['../complex_init'],
                shim: {
                    'non_md_file': {
                        exports: 'myLib'
                    }
                },
                optimize: 'none',
                create: true
            });

            stream.on('end', function () {
                var output = fs.readFileSync('complex_init.js', 'utf8');
                var expected = fs.readFileSync('test/expected/complex_init.js', 'utf8');
                output.should.equal(expected);
            });

            done();
        });
    });


    //@TODO test fo error throwing!

    describe('ERRORS: ', function() {

        it('should throw an error if we forget to pass in an options object', function(done) {

            (function() {
                grjs();
            }).should.throwError(/^Miss.*/);

            done();
        });

        it('should throw an error if we forget to set the baseUrl', function(done) {

            (function() {
                grjs({
                    out: 'test.js'
                });
            }).should.throwError(/^Pip.*/);

            done();
        });


        it('should throw an error if we forget to set the output', function(done) {

            (function() {
                grjs({
                    baseUrl: 'test/dir'
                });
            }).should.throwError(/^Only.*/);

            done();
        });

        // it('should emit an error event when the require.js optimizer finds an error', function(done) {

        //     var stream = grjs({
        //         baseUrl: 'test/dir',
        //         out: 'testURL'
        //     });

        //     stream.on('error', function(err) {
        //         done();
        //     });

        // });

    });

});
