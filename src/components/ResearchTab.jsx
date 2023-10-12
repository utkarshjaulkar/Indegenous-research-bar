import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import '../App.css'
import DataCard from './DataCard'

const ResearchTab = () => {
  const [keyword, setKeyword] = useState('')
  /**
   * searchResults -> data -> [] -> (title, url, paperID, abstract, )
   */
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    const requestData = {
      keyword: keyword,
      limit: 10,
    }

    const response = await axios.post(
      'https://api.gyanibooks.com/search_publication/',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.data.error) {
      setSearchResults([])
    }

    console.log(response.data.data)
    setSearchResults(response.data.data)
  }

  return (
    <>
      <div className="searchbar">
        <TextField
          className="text"
          id="outlined-basic"
          label="Search for keywords"
          variant="filled"
          type="search"
          value={keyword}
          size="small"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <span className="span"></span>

        <Button
          className="btn"
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="results">
          <h2>Web Results:</h2>
          <ul className="list">
            {searchResults.map((result, index) => (
              <DataCard
                key={result.paperId}
                title={result.title}
                url={result.url}
                paperId={result.paperId}
                abstract={result.abstract}
                bibtex={result.citationStyles.bibtex}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default ResearchTab
