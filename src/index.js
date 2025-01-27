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
import SortMiddlewares from './app/middlewares/SortMiddlewares.js';

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
app.use(SortMiddlewares);

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'funnel-outline',
                    desc: 'arrow-down-outline',
                    asc: 'arrow-up-outline',
                };

                const type = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                return `<a href="?_sort&column=${field}&type=${type[sortType]}">
                        <ion-icon name="${icons[sortType]}"></ion-icon>
                    </a>`;
            },
        },
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
