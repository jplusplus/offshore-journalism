const gulp = require('gulp');
const conf = require('../conf/gulp.conf');
const path =  require('path');
const fs = require('fs');
const async = require('async');
const csv = require('csv-parser')
const request = require('request');
const $ = require('cheerio');
const sanitizeHtml = require('sanitize-html');
const XRegExp = require('xregexp');

const STRUCTURE_URL = 'https://docs.google.com/spreadsheets/d/1cQjplOsQMm2mPWlwHOUr3JzlSwO5R6KHYFcHLrnJDpQ/pub?output=csv';

gulp.task('content:structure', structure);
gulp.task('content:pages', pages);

function structure(done) {
  const struct = [];
  request.get(STRUCTURE_URL).pipe(csv())
    .on('data', row => struct.push(row))
    .on('end', () => {
      const output = conf.path.data('structure.json');
      // Saves the structure as JSON and ends the task
      fs.writeFile(output, JSON.stringify(struct, null, 2), done);
    });
}

function pages(done) {
  // Load structure JSON
  const struct = require(path.join('..', conf.path.data('structure.json')));
  // Iterate over each row
  async.eachSeries(struct, (row, next) => {
    // Does the row have a file?
    if(row.file && row.file !== '') {
      // Get the page
      request.get(row.file, (err, res) => {
        // Final output
        const output = conf.path.data(`page-${row.uid}.json`);
        // Emprove sanitizing
        const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['h2', 'sup']);
        const allowedAttributes = sanitizeHtml.defaults.allowedAttributes;
        // Must allow ids on a tags
        allowedAttributes.a = allowedAttributes.a.concat('id');
        // Parse and extract the page content
        row.html = sanitizeHtml($('#contents', res.body).html(), {
          allowedTags: allowedTags,
          allowedAttributes: allowedAttributes
        });
        // Interprets Markdwon markup
        row.html = XRegExp.replaceEach(row.html, 
          [
            [/\*\*(.*?)\*\*/, "<strong>$1</strong>", "all"],
            [/_(.*?)_/, "<em>$1</em>", "all"],
            [/<h3>(.*?)<\/h3>/, "<blockquote>$1</blockquote>", "all"]
          ]);
        // Add a scrolling directive for anchors
        row.html = row.html.split('href="#').join('du-smooth-scroll href="#');
        // Saves the page
        fs.writeFile(output, JSON.stringify(row, null, 2), next);
      });
    } else {
      next();
    }
  }, done);
}
