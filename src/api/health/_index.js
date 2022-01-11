import mongoose
    from 'mongoose';

export default (route) => {
    route.get('/health', async (req, res) => {
        const piagetDatabaseCheck = async () => {
            return mongoose.connection.readyState ? 'up' : 'down';
        };

        const healthStatus = results => {
            const hasDownService = Object.keys(results)
                .find(testName => results[testName] === 'down');

            return hasDownService ? 503 : 200;
        };

        const results = {
            db_piaget: await piagetDatabaseCheck()
        };

        return res.api.send(results, healthStatus(results));
    });
};