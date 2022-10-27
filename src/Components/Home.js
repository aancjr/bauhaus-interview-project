import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import styled from "styled-components";

const Select = styled.select`
  width: 50vw;
  height: 35px;
  padding-left: 5px;
  font-size: 14px;
  margin-left: 10px;
  border-radius: 8px;

  option {
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default function Home() {
    const [data, setData] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [pickedFilter, setPickedFilter] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('https://guileless-sopapillas-50e236.netlify.app/articles.json')
            .then(results => {
                setData(results.data);
                let uniqueFilterOptions = [... new Set(results.data.map(obj => obj.category))]
                setFilterOptions(uniqueFilterOptions);
            })
            .catch(err => setError(true));

        return () => { }

    }, [])

    const handleChange = (e) => {
        setPickedFilter(e.target.value);
    };

    return (
        <>
            {!error ? <div className='container'>
                <div className='filter-section'>
                    <div className='input-row'>
                        <form id='category-filter'>
                            <label >Filter By: </label>
                            <Select id='images' name='images' onChange={handleChange}>
                                <option key='default' value=''>All Categories</option>
                                {filterOptions.map((category, idx) => { return <option key={idx} value={category}>{category}</option> })}
                            </Select>
                        </form>
                    </div>
                </div>
                <div className='image-section'>
                    <div className='image-row'>
                        {data?.filter(obj => {
                            return obj.category.includes(pickedFilter)
                        }).map((image, idx) => (
                            <ImageCard
                                description={image.description}
                                imageURL={image.image}
                                key={idx}
                                title={image.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
                :
                <div className='container'>
                    <div className='error-section'>
                        <h4>An error occured, please contact your network administrator.</h4>
                    </div>
                </div>
            }
        </>

    )
}
