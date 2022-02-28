import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import './customerSearch.scss'

import useDebounce from '../../../hooks/useDebounce'
import Input from '../../core/Input/Input'

const CustomerSearch = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(undefined)

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if(debouncedSearchTerm){
            console.log(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm])

  return (
    <div className="customerSearchContainer">
        <div className="searchContainer">
            <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input" name="Sök efter kund" label="Sök" />
            <SearchIcon className="searchIcon"/>
        </div>
    </div>
  )
}

export default CustomerSearch