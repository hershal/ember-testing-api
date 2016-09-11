const _ = require('lodash');
let app = require('express')();
const cors = require('cors');
const config = require('./config');
const faker = require('faker');

const posts = _.map(_.range(10), (idx) => {
  return {
    id: `${idx}`,
    type: "post",
    attributes: {
      title: faker.lorem.words(),
      author: faker.fake('{{name.firstName}} {{name.lastName}}'),
      date: faker.date.past(),
      content: faker.lorem.paragraphs()
    }
  };
});

app.use(cors());

app.get('/api/v1/posts', function (req, res) {
  res.json({
    meta: {},
    data: posts
  });
});

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`);
});
