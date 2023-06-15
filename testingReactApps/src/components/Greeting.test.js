import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";


describe('Greeting component SUITE', () => {
    test('renders correct greeting', () => {
    
        // arrange
        render(<Greeting/>); 
    
        // act - no act here
    
        // assert
        const greetingElement = screen.getByText('Greetings', { exact: true });
    
        expect(greetingElement).toBeInTheDocument;
    
    });

    test('renders correct paragraph when button is NOT clicked', () => {

        render(<Greeting/>);

        const outputElement = screen.getByText('Testing...', { exact: false });
        expect(outputElement).toBeInTheDocument;

    });

    test('renders correct paragraph when button IS clicked', () => {

        render(<Greeting/>);
        
        const button = screen.getByRole('button');
        userEvent.click(button);

        const outputElement = screen.getByText('Changed the text', { exact: false });
        expect(outputElement).toBeInTheDocument;

    });

    test('initial paragraph is not in when button IS clicked', () => {

        render(<Greeting/>);
        
        const button = screen.getByRole('button');
        userEvent.click(button);

        // use query by text, since getByText throws an error when it does not find the text 
        const outputElement = screen.queryByText('Testing...', { exact: false });
        expect(outputElement).toBeNull();

    });

})

// write the test as close as possible to the tested code


