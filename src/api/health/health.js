import mongoose from 'mongoose';

const health = async (req, res) => {

    const healthStatus = results => {

        const hasDownService = Object.keys(results).find(testName => results[testName] === 'down');
        return hasDownService ? 503 : 200;

    };

    let results = {
        mem_cache: 'up'
    };

    Object.keys(mongoose.companies).forEach(company => {

        results[`db_${company}`] = mongoose.companies[company]._readyState === 1 ? 'up' : 'down';

    });

    res.writeHead(healthStatus(results));
    return res.end(JSON.stringify(results));

};
export default health;
