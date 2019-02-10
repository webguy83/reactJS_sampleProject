import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {

    state = {
        formdata: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;

        this.setState({
            formdata: newFormdata
        })
    }

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Hazzah!! <Link to={`/books/${book.bookId}`}>
                    Click link to see post!
                </Link>

            </div>
            : null
    )

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: this.props.user.login.id
        }))
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewBook())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.formdata.name}
                            onChange={(e) => this.handleInput(e, 'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange={(e) => this.handleInput(e, 'author')}
                        />
                    </div>
                    <textarea
                        value={this.state.formdata.review}
                        onChange={(e) => this.handleInput(e, 'review')}
                    />
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter pages"
                            value={this.state.formdata.pages}
                            onChange={(e) => this.handleInput(e, 'pages')}
                        />
                    </div>
                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            onChange={(e) => this.handleInput(e, 'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={this.state.formdata.price}
                            onChange={(e) => this.handleInput(e, 'price')}
                        />
                    </div>
                    <button type="submit">Add Review</button>
                    {
                        this.props.books.newbook ?
                            this.showNewBook(this.props.books.newbook)
                            : null
                    }
                </form>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddBook);