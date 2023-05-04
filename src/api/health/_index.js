import health from './health';

export default (route) => {
    route.get('/health', [
        health
    ]);
};
