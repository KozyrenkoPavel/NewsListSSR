import cors from 'cors';
import express from 'express';
import RSSParser from 'rss-parser';

const feedURL = 'https://lenta.ru/rss/news';
const parser = new RSSParser();
const PORT = 4000;

const parse = async (url) => {
  const articles = [];

  const feed = await parser.parseURL(url);

  feed.items.forEach((item) => {
    articles.push({ item });
  });

  return articles;
};

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const data = await parse(feedURL);
  res.send(data);
});

const server = app.listen('4000', () => {
  console.log(`Server successfully started on port ${PORT}`);
});

export default server;
