import React, { Component } from 'react'
import Select from 'react-select';

export default class SelectComponent extends Component {

    render() {
        const { options } = this.props;
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                height: 'calc(1.7em + 0.1rem)',
            }),
            container: () => ({
                position: 'relative',
                boxSizing: 'border-box',
            }),
            control: () => ({
                // width: '100%',
                height: 'calc(1.9em + 0.1rem)',
                border: '1px solid #d1d3e2',
                // borderRadius: '0.2rem',
                webkitAlignItems: 'center',
                webkitBoxAlign: 'center',
                msFlexAlign: 'center',
                alignItems: 'center',
                backgroundColor: 'hsl(0,0%,100%)',
                borderColor: 'hsl(0,0%,80%)',
                borderRadius: 4,
                borderRtyle: 'solid',
                borderWidth: 1,
                cursor: 'default',
                display: 'flex',
                webkitFlexWrap: 'wrap',
                msFlexWrap: 'wrap',
                flexWrap: 'wrap',
                webkitBoxPack: 'justify',
                webkitJustifyContent: 'space-between',
                msFlexPack: 'justify',
                justifyContent: 'space-between',
                outline: '0 !important',
                position: 'relative',
                webkitTransition: 'all 100ms',
                transition: 'all 100ms',
                boxRizing: 'border-box',
            }),
            valueContainer: () => ({
                // width: '80%',
                height: 'calc(1.9em + 0.1rem)',
                webkitAlignItems: 'center',
                webkitBoxAlign: 'center',
                msFlexAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                webkitFlex: 1,
                msFlex: 1,
                flex: 1,
                webkitFlexWrap: 'wrap',
                msFlexWrap: 'wrap',
                flexWrap: 'wrap',
                padding: '2px 8px',
                webkitOverflowScrolling: 'touch',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
            }),
            indicatorsContainer: () => ({
                // width: '20%',
                color: 'hsl(0,0%,80%)',
                display: 'flex',
                padding: '0px 8px',
                webkitTransition: 'color 150ms',
                transition: 'color 150ms',
                boxSizing: 'border-box',
            }),
            indicatorsSeparator: () => ({
                alignSelf: 'stretch',
                backgroundColor: 'hsl(0,0%,80%)',
                marginBottom: 8,
                marginTop: 8,
                width: 1,
                boxSizing: 'border-box',
            }),
            dropdownIndicator: () => ({
                color: 'hsl(0,0%,80%)',
                display: 'flex',
                padding: 6,
                webkitTransition: 'color 150ms',
                transition: 'color 150ms',
                boxSizing: 'border-box',
            }),
            clearIndicator: () => ({
                color: 'hsl(0,0%,80%)',
                display: 'flex',
                padding: 6,
                webkitTransition: 'color 150ms',
                transition: 'color 150ms',
                boxSizing: 'border-box',
            }),
            placeholder: () => ({
                marginLeft: 5,
                height: 'calc(1.9em + 0.1rem)',
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';
                const marginLeft = 5;
                // const height = 'calc(1.9em + 0.1rem)';

                return { ...provided, opacity, transition, marginLeft };
            }
        }

        return (
            <Select
                className="basic-single"
                classNamePrefix="select"
                styles={customStyles}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                options={options}
            />
        )
    }
}