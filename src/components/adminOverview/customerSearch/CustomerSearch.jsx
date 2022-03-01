import React, { useState, useEffect, useMemo } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import './customerSearch.scss'

import useDebounce from '../../../hooks/useDebounce'
import Input from '../../core/Input/Input'
import useSearch from '../../../hooks/useSearch';

const CustomerSearch = ({ setFilteredCustomers, filteredCustomers, allCustomers }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(undefined)

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const customerSearch = useSearch({items: allCustomers})


    useEffect(() => {
      if(debouncedSearchTerm == "") setFilteredCustomers(undefined) 

      const foundCustomers = customerSearch.searchByInput(debouncedSearchTerm)
      if(foundCustomers.length < 1) setFilteredCustomers(undefined)
      setFilteredCustomers(foundCustomers)

    },[debouncedSearchTerm])

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