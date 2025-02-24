module.exports = {
    ci: {
      collect: {
        numberOfRuns: 5,
        startServerCommand: 'npm start',
        url: ['http://localhost:3000/'],
        settings: {
          onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'seo',
          ],
          skipAudits: ['uses-http2'],
          chromeFlags: '--no-sandbox',
          extraHeaders: JSON.stringify({
            Cookie: 'customCookie=1;foo=bar',
          }),
        },
      },
      assert: {
        assertions: {
          'categories:performance': [
            'error',
            { minScore: 0.9, aggregationMethod: 'median-run' },
          ],
          'categories:accessibility': [
            'error',
            { minScore: 1, aggregationMethod: 'pessimistic' },
          ],
          'categories:best-practices': [
            'error',
            { minScore: 1, aggregationMethod: 'pessimistic' },
          ],
          'categories:seo': [
            'error',
            { minScore: 1, aggregationMethod: 'pessimistic' },
          ],
        },
      },
      upload: {
        target: 'lhci',
        serverBaseUrl: 'http://localhost:9001',
        token: '4cb2e697-bebe-43a9-a1e5-7c9123edc6ec'
      },
    },
  }