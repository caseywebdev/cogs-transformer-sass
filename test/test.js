import helper from 'cogs-test-helper';

export default helper.createTests({
  'test/config.js': {
    'test/foo.sass': helper.getFileBuffer('test/output.css'),
    'test/empty.sass': helper.getFileBuffer('test/empty.sass'),
    'test/error.sass': Error
  }
});
