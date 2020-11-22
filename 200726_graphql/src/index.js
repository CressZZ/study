const { ApolloServer } = require('apollo-server');
const fs = require('fs')

const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8')

// const typeDefs = `


// `

const resolvers = {
  Query: {
    articles(parent, arg) {
      // 함수 내에서
      // parent, arg를 잘 조합해서, 
      // DB, Redis, Memcached, http, gRPC를 날리든 잘 return  
      console.log(arg)
      return [
        {
          id: 1,
          createdAt: "",
          updatedAt: "",
          deletedAt: "",
          categoryId: "",
          title: "안녕하세요~~",
          viewNum: 11,
          content: "하이",
          authorId: 1,
          thumbnailId: 3,
        }
      ]
    },
  },
  Article: {
    id(parent) {
      return parent.id
    },
    author(parent) {
      // parent.authorId로 
      // DB에 요청
      // 받아온다!
      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        nickname: "Tony",
        imageId: 10
      }
    },
    comments(parent) {
      // DB 뒤져서 eotrmf fltmxmfmf rkwu dhsek. 
      return [
        {
          id: 1,
          createdAt: "",
          updatedAt: "",
          authorId: 1,
          content: "댓글테스트",
        }
      ]
    }
  },
  User: {
    image(parent) {
      // parent.imageId로
      // DB에 요청!
      // 받아온다!

      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        url: "...",
      }
    }
  },
  Comment: {
    author(parent) {
      // parent.authorId를 가지고
      // User 테이블을 뒤져서...
      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        nickname: "Tony",
        imageId: 10,
      }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

console.log('starting...');
server.listen(3000);

