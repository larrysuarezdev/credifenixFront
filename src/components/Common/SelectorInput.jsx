import React, { Component } from 'react'

class SelectorInput extends Component {
    render() {
        const { value, onClick, onReset } = this.props
        
        return (
            <div className="form-control form-control-sm SelectorInput" >
                <span className="caption">
                    <span>
                        {value}
                    </span>
                </span>
                {value ? <span className="reset" onClick={(e) => onReset(e)}>&#10005;</span> : null}
                <span className="button">
                    <button onClick={(e) => onClick(e)}>
                        <span>
                            ...
                        </span>
                    </button>
                </span>
            </div>
        )
    }
}

export default SelectorInput