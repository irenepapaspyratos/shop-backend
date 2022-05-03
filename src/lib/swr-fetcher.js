const swrFetcher = (...args) =>
    fetch(...args).then(response => response.json());

export default swrFetcher;
