const graphql = require("./node_modules/graphql");
const DB = require("./db");
const _ = require("./node_modules/lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const Posttype = new GraphQLObjectType({
  name: "Post",
  description: "This is a post",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    person: {
      type: PersonType,
      resolve(parent, args) {
        //console.log(parent.id);
        return DB.models.person.findByPk(parent.personid);
      }
    }
  })
});

const parentType = new GraphQLObjectType({
  name: "Parent",
  description: " Person's parent",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parent) {
        return parent.id;
      }
    },
    father: {
      type: GraphQLString,
      resolve(parent) {
        return parent.father;
      }
    },
    mother: {
      type: GraphQLString,
      resolve(parent) {
        return parent.mother;
      }
    },
    person: {
      type: PersonType,
      resolve(root, args) {
        //console.log(root.id);

        return DB.models.person.findByPk(root.personid);
      }
    }
  })
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "This represent person",
  fields: () => ({
    id: { type: GraphQLInt },
    image: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    post: {
      type: new GraphQLList(Posttype),
      resolve(parent, args) {
        return DB.models.post.findAll({ where: { personid: parent.id } });
      }
    },
    parents: {
      type: new GraphQLList(parentType),
      resolve(parent, args) {
        console.table(parent.id);
        return DB.models.parent.findAll({ where: { personid: parent.id } });
      }
    }
  })
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is a rootquery",
  fields: () => {
    return {
      person: {
        type: new GraphQLList(PersonType), //
        args: {
          id: { type: GraphQLID },
          email: { type: GraphQLString }
          //firstname: { type: GraphQLString }
        },
        resolve(parent, args) {
          return DB.models.person.findAll({ where: args });
        }
      },
      post: {
        type: new GraphQLList(Posttype),
        args: {
          id: { type: GraphQLID },
          title: { type: GraphQLString },
          content: { type: GraphQLString }
        },
        resolve(parent, args) {
          // console.log(parent);

          return DB.models.post.findAll({ where: args });
        }
      },
      parent: {
        type: new GraphQLList(parentType),
        args: {
          id: { type: GraphQLID },
          father: { type: GraphQLString },
          mother: { type: GraphQLString }
        },
        resolve(parent, args) {
          return DB.models.parent.findAll({ where: args });
        }
      }
    };
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Data can create",
  fields() {
    return {
      addPerson: {
        type: PersonType,
        args: {
          firstname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          image: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(parent, args) {
          return DB.models.person.create({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email.toLowerCase(),
            image: args.image
          });
        }
      },
      addpost: {
        type: Posttype,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          content: {
            type: new GraphQLNonNull(GraphQLString)
          },
          personid: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(parent, args) {
          return DB.models.post.create({
            title: args.title,
            content: args.content,
            personid: args.personid
          });
        }
      },
      addparent: {
        type: parentType,
        args: {
          father: { type: new GraphQLNonNull(GraphQLString) },
          mother: { type: new GraphQLNonNull(GraphQLString) },
          personid: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(parent, args) {
          return DB.models.parent.create({
            father: args.father,
            mother: args.mother,
            personid: args.personid
          });
        }
      }
    };
  }
});

const Scheme = new GraphQLSchema({
  query,
  mutation
});

module.exports = Scheme;
