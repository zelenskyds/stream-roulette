import { Component } from 'react';

export default class Window extends Component {
    _remoteCalls = () => ({});
    remoteCalls = () => this._remoteCalls();

    constructor(props) {
        super( props );
        props.getRemoteCalls && props.getRemoteCalls(this.remoteCalls);
    }
}