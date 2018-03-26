import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import PropTypes from "prop-types";

import { getRightFilmList }  from '../../Selectors/';
import * as actionCreators from "../../Actions/";
import ListFilm from '../ListFilm/';

class FilmListContainer extends Component {

    constructor(props) {
        super(props);
        this.getFilmList = this.getFilmList.bind(this);
    }

    componentWillMount() {
        if(!this.props.firstLoad){
            this.getFilmList()
                .then(res => {
                    this.props.actions.loadFilmList(res);
                })
                .catch(err => console.log(err));
        }
    }

    getFilmList = async () => {
        const response = await fetch('http://localhost:3000/getAllFilms');
        //   https://salty-island-73231.herokuapp.com/getAllFilms
        // https://salty-island-73231.herokuapp.com/
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
                <ListFilm filmList={this.props.filmList} firstLoad ={this.props.firstLoad}/>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        filmList: getRightFilmList(state),
        firstLoad: state.reducer.firstLoadReducer.firstLoad
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators,dispatch),
    }
};

FilmListContainer.propTypes = {
    filmList: PropTypes.array,
    firstLoad: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
        loadFilmList: PropTypes.func,
        noneSort: PropTypes.func,
        searchFilm: PropTypes.func,
        sortByMark: PropTypes.func,
        sortByName: PropTypes.func
    })
};

export default connect(mapStateToProps,mapDispatchToProps)(FilmListContainer);