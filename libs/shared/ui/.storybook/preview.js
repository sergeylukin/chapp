// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined') {
  // note: we must use relative imports here
  // const { worker } = require('../../util-testing/src/lib/mocks/browser');
  // console.log(worker);
  const req = require.context('../src/lib', true, /\.mock\.ts$/);

  req.keys().forEach((filename) => {
    const { worker } = req(filename);
    worker.start();
  });

  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  // worker.start();
}

export * from '../../../../.storybook/preview';
