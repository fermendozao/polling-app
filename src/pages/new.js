import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { arrayMove } from 'react-sortable-hoc';
import shortId from 'short-id';

import { Button } from '../styledComponents/theme';
import { Heading2 } from '../styledComponents/typography';
import NewPoll from '../components/newPoll';

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class NewPollPage extends Component {
  state = {
    options: [
      {
        text: 'option1',
        id: '123avcs232',
        editing: false,
      },
      {
        text: 'option2',
        id: '123av35df2',
        editing: false,
      },
      {
        text: 'option3',
        id: '12323dsdsv35df2',
        editing: false,
      },
      {
        text: 'option4',
        id: 'ac24312v35df2',
        editing: false,
      },
    ],
  };

  // to keep track of what item is being edited
  editing = null;

  handleKeydown = e => {
    if (e.which === 27) this.handleToggleEdit(this.editing);
    if (e.which === 13) this.handleAddItem();
  };

  handleToggleEdit = id => {
    this.setState(prevState => {
      const options = prevState.options
        .filter(({ text }) => text)
        .map(option => {
          if (option.id === id) {
            if (!option.editing) {
              this.editing = id;
            } else {
              this.editing = null;
            }

            return {
              ...option,
              editing: !option.editing,
            };
          }

          return {
            ...option,
            editing: false,
          };
        });

      return {
        ...prevState,
        options,
      };
    });
  };

  handleTextChange = (e, id) => {
    const {options: stateOptions} = this.state;
    const options = stateOptions.map(option => {
      if (option.id === id) {
        return {
          ...option,
          text: e.target.value,
        };
      }

      return option;
    });

    this.setState({
      ...this.state,
      options,
    });
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const {options} = this.state;
    this.setState({
      ...this.state,
      options: arrayMove(options, oldIndex, newIndex),
    });
  };

  handleAddItem = () => {
    const {options} = this.state;
    // if the user spams add w/o writing any text the items w/o any text get removed
    options
      // filter out any falsy values from the list
      .filter(Boolean)
      .filter(({ text }) => text)
      .map(option => ({
        ...option,
        editing: false,
      }));
    const id = shortId.generate();
    this.editing = id;

    this.setState({
      ...this.state,
      options: [
        ...options,
        {
          id,
          text: '',
          editing: true,
        },
      ],
    });
  };

  handleDelete = id => {
    const options = this.state.options.filter(option => option.id !== id);

    this.setState({
      ...this.state,
      options,
    });
  };

  render() {
    const { options } = this.state;

    return (
      <div>
        <Heading2>Create a new Poll</Heading2>
        <NewPoll
          options={options}
          onToggleEdit={this.handleToggleEdit}
          onTextChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          onSortEnd={this.handleSortEnd}
          onDelete={this.handleDelete}
        />
        <ActionContainer>
          <Link to="/new">
            <Button>Create</Button>
          </Link>
          <Button onClick={this.handleAddItem}>Add</Button>
        </ActionContainer>
      </div>
    );
  }
}

export default NewPollPage;