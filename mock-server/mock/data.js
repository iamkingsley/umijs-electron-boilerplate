export let groups = [
  {
    _id: "1",
    name: "Admin",
    clientId: 1,
    status: 1,
    description: "administrator",
    createdDate: "2019-01-12",
    authorities: [
      "USR_ADD",
      "USR_VIEW",
      "USR_EDIT",
      "USR_REMOVE",
      "USR_PROFILE",
      "GRP_EDIT",
      "GRP_ADD",
      "GRP_REMOVE",
      "GRP_VIEW",
      "PDT_ADD",
      "PDT_EDIT",
      "PDT_REMOVE",
      "PDT_VIEW",
      "CAT_ADD",
      "CAT_REMOVE",
      "CAT_EDIT",
      "CAT_VIEW"
    ]
  },
  {
    _id: "2",
    name: "Worker",
    clientId: 1,
    status: 1,
    description: "ordinary worker",
    createdDate: "2019-01-12",
    authorities: []
  }
];

export var users = [
  {
    _id: "1",
    name: "jon doe",
    username: "jon",
    password: "asd",
    phoneNumber: "024893494",
    status: 1,
    clientId: "1",
    groups: ["1"]
  }
];

export var categories = [
  {
    _id: "1",
    name: "Cat 1"
  },
  {
    _id: "2",
    name: "cat 2"
  }
];

export var products = [
  {
    _id: "1",
    length: 43,
    conductorSize: 2.2,
    color: "red",
    category: "2",
    status: "IN_STOCK",
    distributor: "1",
    cableType: "ncy20",
    createdAt: "2019-1-11"
  },
  {
    _id: "2",
    length: 200,
    conductorSize: 1.5,
    color: "black",
    category: "1",
    status: "CODE_EXPIRED",
    distributor: "2",
    cableType: "ncy10",
    createdAt: new Date("2019-1-21 10:15").toISOString()
  },
  {
    _id: "23",
    length: 200,
    conductorSize: 1.5,
    color: "black",
    category: "1",
    status: "DISTRIBUTED",
    distributor: "2",
    cableType: "ncy10",
    createdAt: new Date("2019-1-21 10:15").toISOString()
  },
  {
    _id: "123456789",
    length: 111,
    conductorSize: 1.5,
    color: "green",
    category: "1",
    status: "CREATED",
    distributor: "2",
    cableType: "ncy10",
    createdAt: new Date("2019-1-21 10:15").toISOString()
  },
  {
    _id: "12345678",
    length: 200,
    conductorSize: 1.5,
    color: "black",
    category: "1",
    status: "CREATED",
    distributor: "2",
    cableType: "ncy10",
    createdAt: new Date("2019-1-21 10:15").toISOString()
  }
];
