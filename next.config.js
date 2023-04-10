module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/groups',
          permanent: true,
        },
      ]
    },
  }