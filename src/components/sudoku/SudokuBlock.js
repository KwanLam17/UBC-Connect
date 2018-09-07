import React, { Component } from 'react';

import SudokuCell from './SudokuCell';

class SudokuBlock extends Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <SudokuCell />
                    </div>
                    <div class="col-lg-4">
                        <SudokuCell />
                    </div>
                    <div class="col-lg-4">
                        <SudokuCell />
                    </div>
                </div>
            </div>
        )
    }
}

export default SudokuBlock;