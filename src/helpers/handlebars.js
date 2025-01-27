const Handlebars = require('handlebars');

module.exports = {
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

        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type[sortType]}`,
        );
        const output = `<a href="${href}">
                <ion-icon name="${icons[sortType]}"></ion-icon>
            </a>`;

        return new Handlebars.SafeString(output);
    },
};
