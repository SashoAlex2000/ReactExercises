import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Async from "./AsyncFetch";


describe('Async component SUITE', () => {

    // we don't usually want to sent test all the whole time
    // especially when data is sent, it shouldn't change things in the back-end/DB
    test('renders posts correctly', async () => {
        render (<Async/>); // no act, fetched automatically

        // 'find' returns a promise, testing library will re-evaluate until promise is successful
        const liEmelements = await screen.findAllByRole('listitem'); 

        expect(liEmelements).not.toHaveLength(0);

    });

    test('renders posts correctly with mock data', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{
                id: 'id1',
                title: 'First Post',
            }, {
                id: 'id2',
                title: 'Second Post',
            }]
        }); // what should fetch resolve to

        render (<Async/>); // no act, fetched automatically

        // 'find' returns a promise, testing library will re-evaluate until promise is successful
        const liEmelements = await screen.findAllByRole('listitem'); 

        expect(liEmelements).not.toHaveLength(0);

    });

})

// write the test as close as possible to the tested code


