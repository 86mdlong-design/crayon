const test = require('node:test');
const assert = require('node:assert');
const { clip, timeAgo } = require('../utils/format');

test('clip shortens long text', () => {
  assert.strictEqual(clip('a'.repeat(200), 10), 'aaaaaaaaa…');
});

test('clip leaves short text alone', () => {
  assert.strictEqual(clip('hello'), 'hello');
});

test('timeAgo handles fresh timestamps', () => {
  assert.strictEqual(timeAgo(new Date().toISOString()), 'just now');
});
