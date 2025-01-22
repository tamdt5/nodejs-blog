import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import path from 'path';
import { engine as handlebars } from 'express-handlebars';
import * as sass from 'sass';
const app = express();
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'public')))

// HTTP Logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

const result = await sass.compileAsync(path.join(__dirname,'resources/scss/app.scss'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      
