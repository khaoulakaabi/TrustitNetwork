module.exports = (req, res, next) => {
    let q = req.query;
    let query = {
      page: 1,
      limit: 10,
      sort: { createdAt: -1 }, // createdAt_desc
      conditions: {},
      search: false
    };
    if (Number(q.page)) {
      query.page = Number(q.page);
    }
    if (Number(q.limit)) {
      query.limit = Number(q.limit);
    }
    if (q.sort) {
      query.sort = q.sort;
    }
    // if (q.search) {
    //   query.search = new RegExp(q.search, 'i');
    // }
    delete q.page;
    delete q.limit;
    delete q.sort;
    delete q.search;
    query.conditions = q;
    req.query = query;
  
    // let search = {};
    // if (req.query.search) {
    //   search.title = req.query.search;
    // }
    let conditions = {
      ...req.query.conditions,
      // ...search
    };
    // console.log(conditions);
    let options = {
      sort: req.query.sort,
      page: req.query.page,
      limit: req.query.limit
    };
    req.query.options = options;
    req.query.conditions = conditions;
    return next();
  };