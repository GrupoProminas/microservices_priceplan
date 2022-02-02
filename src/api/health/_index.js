import mongoose
    from 'mongoose';

export default (route) => {
    route.get('/health', async (req, res) => {
        const healthStatus = results => {
            const hasDownService = Object.keys(results)
                .find(testName => results[testName] === 'down');

            return hasDownService ? 503 : 200;
        };

        const results = {};

        Object.keys(mongoose.companies).forEach(company => {
            results[`db_${company}`] = mongoose.companies[company].readyState ? 'up' : 'down';
        });

        return res.api.send(results, healthStatus(results));
    });
};
