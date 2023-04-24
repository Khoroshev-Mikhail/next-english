// export const typeDefs = `
//   enum Word_Type {
//     NOUN
//     VERB
//     ADJECTIVE 
//     ADVERB 
//     PRONOUN
//     NUMERAL
//     ARTICLE
//     PREPOSITION
//     CONJUNCTION
//     IRREGULAR_VERB
//     PHRASAL_VERB 
//   }
//   type Test {
//     id: ID
//     value: String
//   }
//   type Word {
//     id: ID
//     eng: String
//     rus: String
//     type: Word_Types
//   }

//   type Query {
//     tests: [Test]!
//     words: [Word]
//   }
//   query MyQuery {
//   words {
//     eng
//     rus
//     type
//   }
// }
// `
import { builder } from "./builder";

export const schema = builder.toSchema()