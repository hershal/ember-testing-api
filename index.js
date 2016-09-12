const _ = require('lodash');
let app = require('express')();
const cors = require('cors');
const config = require('./config');
const faker = require('faker');

const posts = _.map(_.range(10), (idx) => {
  return {
    id: `${idx}`,
    type: "blog-post",
    attributes: {
      title: faker.lorem.words(),
      author: faker.fake('{{name.firstName}} {{name.lastName}}'),
      date: faker.date.past(),
      content: faker.lorem.paragraphs()
    }
  };
});

app.use(cors());

app.get('/api/v1/blog-posts', function (req, res) {
  let limitedPosts = posts;
  const page = req.query.page;
  if (typeof(page) != undefined && !isNaN(page)) {
    limitedPosts = _.chunk(posts, 2)[page];
  }
  res.json({
    meta: {},
    data: limitedPosts
  });
});

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`);
});
