import PropTypes from 'prop-types';
import { IoSearchOutline } from 'react-icons/io5';
import { Header, SearchForm, Button, Label, Input, } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
    return (
      <Header>
      <SearchForm onSubmit={onSubmit}>
        <Button type="submit">
        <IoSearchOutline size={24} />
          <Label>Search</Label>
        </Button>
    
        <Input
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
    );
  }
  
  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };