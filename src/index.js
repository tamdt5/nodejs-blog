import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { engine as handlebars } from 'express-handlebars';
import * as sass from 'sass';
import route from './routes/index.js';
import { connect } from './config/db/index.js';
import methodOverride from 'method-override';
import sortMiddlewares from './app/middlewares/SortMiddlewares.js';
import handlebarHelpers from './helpers/handlebars.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// HTTP Logger
// app.use(morgan('combined'))

//Custom middleware
app.use(sortMiddlewares);

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: handlebarHelpers,
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.urlencoded({ extended: false }));

const result = await sass.compileAsync(
    path.join(__dirname, 'resources/scss/app.scss'),
);

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
