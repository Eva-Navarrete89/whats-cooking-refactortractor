import { expect } from 'chai';

import Search from '../src/search.js';

describe('Search', () => {
    
    it('should be an instance of Search class', () => {
        const search = new Search();
        expect(search).to.be.an.instanceOf(Search);
    }); 

    


})