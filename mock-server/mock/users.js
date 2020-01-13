const jwt = require("jsonwebtoken");
import { groups } from "./data";
var users = require("./data").users;

export default {
  "GET /api/users": (req, res) => {
    setTimeout(() => {
      res.json(users);
    }, 0);
  },
  "GET /api/users/:id": (req, res) => {
    let item = users.find(p => p._id == req.params.id);
    setTimeout(() => {
      if (item) res.json(item);
      else res.status(404).send();
    }, 0);
  },
  "POST /api/users": (req, res) => {
    let user = req.body;
    setTimeout(() => {
      user._id = users.length + 1;
      user.createdAt = new Date().toISOString;
      users.push(user);
      res.json(user);
    }, 0);
  },
  "PUT /api/users/:id": (req, res) => {
    let gid = req.params.id;
    let user = users.find(p => p._id == gid);
    user = { ...user, ...req.body };
    setTimeout(() => {
      if (user) {
        users = users.map(g => (g._id == gid ? user : g));
        res.json(user);
      } else res.status(404).send();
    }, 0);
  },
  "DELETE /api/users/:id": (req, res) => {
    let gid = req.params.id;
    setTimeout(() => {
      let user = users.find(p => p._id == gid);
      if (user) {
        users = users.filter(g => g._id != gid);
        res.json(true);
      } else res.status(404).send();
    }, 0);
  },
  "POST /public/users/login": (req, res) => {
    let user = users.find(p => p.username == req.body.username);
    setTimeout(() => {
      if (user) {
        let scope = [];
        groups.map(group => {
          if (user.groups.includes(group._id))
            scope = scope.concat(group.authorities);
        });
        let token = jwt.sign(
          { scope, _id: user._id, clientId: user.clientId },
          "secret",
          { expiresIn: 86400 * 3 }
        );
        const resp = { token, user };
        res.json(resp);
      } else res.status(401).send();
    }, 0);
  }
};
