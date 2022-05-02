import dataCategories from './static-categories.json';
import dataProducts from './static-products.json';

export function getStatData(string) {
    console.log(string);

    if (string === 'categories') {
        console.log(string);
        return dataCategories;
    } else if (string === 'products') {
        console.log(string);
        return dataProducts;
    }
}
