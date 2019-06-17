import test from 'ava';
import {exec} from 'child_process';

if (process.env['TRAVIS_OS_NAME'] !== 'windows') {
  test.serial.cb('browser-do detects passed tape tests', t => {
    exec('npx browserify test/samples/_tape-good.js | node bin/browser-do.js --tap -b firefox-headless', error => {
      t.falsy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do detects failed tape tests', t => {
    exec('npx browserify test/samples/_tape-bad.js | node bin/browser-do.js --tap -b firefox-headless', error => {
      t.truthy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do detects passed jasmine tests', t => {
    exec('npx browserify test/samples/_jasmine-good.js | node bin/browser-do.js --jasmine -b firefox-headless', error => {
      t.falsy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do detects failed jasmine tests', t => {
    exec('npx browserify test/samples/_jasmine-bad.js | node bin/browser-do.js --jasmine -b firefox-headless', error => {
      t.truthy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do detects passed mocha tests', t => {
    exec('npx browserify test/samples/_mocha-good.js | node bin/browser-do.js --mocha -b firefox-headless', error => {
      t.falsy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do detects failed mocha tests', t => {
    exec('npx browserify test/samples/_mocha-bad.js | node bin/browser-do.js --mocha -b firefox-headless', error => {
      t.truthy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do supports static assets and html input', t => {
    exec('cat test/_jasmine-good.html | node bin/browser-do.js --jasmine --static test/samples -b firefox-headless', error => {
      t.falsy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do supports static assets and html input, with failed tests', t => {
    exec('cat test/_jasmine-bad.html | node bin/browser-do.js --jasmine --static test/samples -b firefox-headless', error => {
      t.truthy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do supports mock and html input', t => {
    exec('cat test/_mock-jasmine-good.html | node bin/browser-do.js --jasmine --mock test/_mock.js -b firefox-headless', error => {
      t.falsy(error);
      t.end();
    });
  });

  test.serial.cb('browser-do supports mock and html input, with failed tests', t => {
    exec('cat test/_mock-jasmine-bad.html | node bin/browser-do.js --jasmine --mock test/_mock.js -b firefox-headless', error => {
      t.truthy(error);
      t.end();
    });
  });
} else {
  test('bypass firefox on travis-ci windows box', t => {
    t.pass('bypass firefox on travis-ci windows box');
  });
}
