// Search chỉ bật khi có đủ credential thật từ biến môi trường.
module.exports =
    process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY
        ? {
              appId: process.env.ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_API_KEY,
              indexName: process.env.ALGOLIA_INDEX_NAME || 'tiennhmio',
              contextualSearch: true,
              insights: true,
          }
        : undefined;
