const Customer = require('./models/Customer');

// Test search functionality
async function testSearch() {
    try {
        console.log('Testing customer search functionality...\n');

        // Test 1: Search by general query
        console.log('Test 1: General search');
        const searchResults = await Customer.search('john');
        console.log(`Found ${searchResults.length} customers with general search for "john"`);
        searchResults.forEach(customer => {
            console.log(`- ${customer.name} (${customer.email})`);
        });
        console.log('');

        // Test 2: Search by name only
        console.log('Test 2: Search by name only');
        const nameSearchResults = await Customer.searchByName('john');
        console.log(`Found ${nameSearchResults.length} customers with name search for "john"`);
        nameSearchResults.forEach(customer => {
            console.log(`- ${customer.name} (${customer.email})`);
        });
        console.log('');

        // Test 3: Search with empty query
        console.log('Test 3: Empty search query');
        const emptySearchResults = await Customer.search('');
        console.log(`Found ${emptySearchResults.length} customers with empty search`);
        console.log('');

        // Test 4: Search with non-existent name
        console.log('Test 4: Non-existent name search');
        const nonExistentResults = await Customer.searchByName('nonexistentname12345');
        console.log(`Found ${nonExistentResults.length} customers with non-existent name search`);
        console.log('');

        console.log('Search functionality tests completed successfully!');

    } catch (error) {
        console.error('Error testing search functionality:', error.message);
    }
}

// Run the test
testSearch(); 