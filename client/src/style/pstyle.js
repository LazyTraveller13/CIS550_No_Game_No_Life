  import styled from 'styled-components'


  export const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 2rem 0;
    height: 3rem;
`

export const SearchDiv = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    background-color: white;
    border-radius: 2rem;
`

export const SearchBar = styled.input`
    width: 80%;
    height: 80%;
    border: none;
    font-size: 2rem;
    :focus {
        outline: none;
    }
`

export const MagnifyingGlass = styled.button`
    height: 100%;
    font-size: 1.3rem;
    background-color: white;
    border: none;
    padding: 1rem;
    padding-top: 0.7rem;
    border-radius: 2rem;
`

