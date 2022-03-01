import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import './customerSearch.scss'

import useDebounce from '../../../hooks/useDebounce'
import Input from '../../core/Input/Input'

const CustomerSearch = ({ setFilteredCustomers, filteredCustomers }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(undefined)

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // const [allCustomers, setAllCustomers] = useState(undefined)

    // useEffect(() => {
    //     if(!filteredCustomers) return

    //     setAllCustomers(filteredCustomers)

    // },[filteredCustomers])

    // useEffect(() => {
    //     if(debouncedSearchTerm && filteredCustomers){
    //         console.log(debouncedSearchTerm)
           
    //         if(debouncedSearchTerm.length < 3) return setFilteredCustomers(allCustomers)

    //         const foundCustomers = []
    //         filteredCustomers.forEach(c => {
    //             const firstName = c.first_name
    //             console.log("CUSTOMER ---> ", c)
    //             if(firstName && firstName.startsWith(debouncedSearchTerm)) foundCustomers.push(c)
    //         })
    //         setFilteredCustomers(foundCustomers)
    //     }
    // }, [debouncedSearchTerm])

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