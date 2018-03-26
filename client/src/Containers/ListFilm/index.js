import React, { Component } from 'react';
import ReactList from 'react-list';
import PropTypes from "prop-types";

import FilmBox from '../../Components/FilmBox/index';

class ListFilm extends  React.Component {
    constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);
        console.log(props);
    }

    renderItem(index,key) {
        return <FilmBox
            name={this.props.filmList[index].filmName}
            key={key}
            description={this.props.filmList[index].shortDescription}
            poster={this.props.filmList[index].poster}
        />
    }
    render() {
            if(this.props.filmList.length === 0 && this.props.firstLoad) return <div>Nothing to show</div>;

            return (
            <ReactList
            itemRenderer={this.renderItem}
            length={this.props.filmList.length}
            type='variable'
            />

        )
    }

} ;

ListFilm.propTypes = {
    filmList: PropTypes.array,
    firstLoad: PropTypes.bool.isRequired
};

export default ListFilm;