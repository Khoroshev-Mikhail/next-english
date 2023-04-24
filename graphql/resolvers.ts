// /graphql/resolvers.ts
export const resolvers = {
    Query: {
      tests: () => {
        return prisma.test.findMany()
      },
      words: () => {
        return prisma.word.findMany()
      },
    },
  }