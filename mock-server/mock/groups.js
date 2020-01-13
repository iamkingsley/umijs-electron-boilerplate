// import { groups } from "./data";
var groups = require("./data").groups;

export default {
  "GET /api/groups": (req, res) => {
    setTimeout(() => {
      res.json(groups);
    }, 2000);
  },
  "GET /api/groups/:id": (req, res) => {
    let item = groups.find(p => p._id == req.params.id);
    setTimeout(() => {
      if (item) res.json(item);
      else res.status(404).send();
    }, 0);
  },
  "POST /api/groups": (req, res) => {
    let group = req.body;
    setTimeout(() => {
      group._id = groups.length + 1;
      group.createdAt = new Date().toISOString;
      groups.push(group);
      res.json(group);
    }, 0);
  },
  "PUT /api/groups/:id": (req, res) => {
    let gid = req.params.id;
    let group = groups.find(p => p._id == gid);
    setTimeout(() => {
      if (group) {
        groups = groups.map(g => (g._id == gid ? req.body : g));
        res.json(group);
      } else res.status(404).send();
    }, 0);
  },
  "DELETE /api/groups/:id": (req, res) => {
    let gid = req.params.id;
    setTimeout(() => {
      let group = groups.find(p => p._id == gid);
      if (group) {
        groups = groups.filter(g => g._id != gid);
        res.json(true);
      } else res.status(404).send();
    }, 0);
  }
};
