import helper from 'cogs-test-helper';

export default helper.createTests({
  'test/config.js': {
    'test/foo.sass': 'test/output.css',
    'test/empty.sass': 'test/empty.sass',
    'test/error.sass': Error
  }
});
