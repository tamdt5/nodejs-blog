import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:32772/tamdt_blog_dev', {
            directConnection: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('success');
    } catch (error) {
        console.log('error', error);
    }
}
