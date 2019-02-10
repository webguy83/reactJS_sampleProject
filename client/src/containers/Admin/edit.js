import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
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

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata))
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-reviews');
        }, 1000)
    }

    componentWillMount() {
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook())
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let book = nextProps.books.book;
        this.setState({
            formdata: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        })
    }

    render() {
        let books = this.props.books;
        return (
            <div className="rl_container article">
                {
                    books.updateBook ?
                        <div className="edit_confirm">
                            Post updated, <Link to={`/books/${books.book._id}`}>
                                Click here to see your post.
                        </Link>
                        </div>
                        : null
                }
                {
                    books.postDeleted ?
                        <div className="red_tag">
                            Post Deleted
                     {this.redirectUser()}
                        </div>
                        : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit a review</h2>

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
                    <button type="submit">Edit Review</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}>
                            Delete Review
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(EditBook);