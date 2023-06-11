import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Transition from "react-transition-group/Transition";


class App extends Component {
    state = {
        modalIsOpen: false,
        showBlock: false
    }

    showModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>

                {/* in this way the elements are always present in the DOM, slowing performance and not very React-y */}
                {/* <Modal show={this.state.modalIsOpen} closed={this.closeModal}/>
        <Backdrop show={this.state.modalIsOpen} /> */}

                <button onClick={
                    () => { this.setState(prevState => ({ showBlock: !prevState.showBlock })) }
                } className="Button"> TOGGLE</button>
                <br></br>
                {/* {this.state.showBlock ? <div style={{
                    backgroundColor: "red",
                    width: 100,
                    height: 100,
                    margin: 'auto',
                }}></div> : null} */}

                <Transition
                    in={this.state.showBlock}
                    timeout={300}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >   
                    {/* 'state' managed by the Transtion, with four states - entered, entering, exiting, exited */}
                    {state => (
                        <div style={{
                            backgroundColor: "red",
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            transition: 'opacity 1s ease-out',
                            opacity: state=='exiting' ? 0 : 1,
                        }}></div>
                    )}
                    
                </Transition>

                {/* In this way, with pure css, there is only entrance animation, since React immediately removes them from done when needs be */}
                {/* {this.state.modalIsOpen ? <Modal show={this.state.modalIsOpen} closed={this.closeModal} /> : null} */}
                {/* {this.state.modalIsOpen ? <Backdrop show={this.state.modalIsOpen} /> : null} */}

                <Transition
                    in={this.state.modalIsOpen}
                    timeout={450}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    {state => (
                         <Modal show={state} closed={this.closeModal} />
                    )}
                </Transition>
                {this.state.modalIsOpen ? <Backdrop show={this.state.modalIsOpen} /> : null}        
                        

                <button className="Button" onClick={this.showModal}>Open Modal</button>
                <h3>Animating Lists</h3>
                <List />
            </div>
        );
    }
}

export default App;
