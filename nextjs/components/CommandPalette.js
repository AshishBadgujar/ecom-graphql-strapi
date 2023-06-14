import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_BY_FILTER } from '../utils/queries';

const CommandPalette = ({ togglePalette }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCT_BY_FILTER, {
        variables: {
            filters: {
                name: {
                    contains: searchQuery
                }
            }
        }
    })
    useEffect(() => {
        if (searchQuery.length != 0) {
            getProducts()
        }
    }, [searchQuery])
    if (loading) return <h1>loading...</h1>
    if (data) console.log(data)



    const handleChange = (e) => {
    }
    return (
        <Modal >
            <div class="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-1 sm:w-full sm:max-w-lg">
                <div class="bg-white">
                    <div class='mx-auto'>
                        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <div class="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autocomplete="off"
                                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.." />
                            <button onClick={togglePalette} type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                <span class="sr-only">Close menu</span>
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {searchQuery.length != 0 &&
                <div class="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-1 sm:w-full sm:max-w-lg">
                    <div class="bg-white">
                        {data?.products.data.map((item) => <CardList id={item.id} text={item.attributes.name} togglePalette={togglePalette} />)}
                    </div>
                </div>
            }
        </Modal>
    );
};

export default CommandPalette;

function Modal({ children }) {
    return (
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" ></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex flex-col min-h-full items-end text-center sm:items-center sm:py-20">
                    {children}

                </div>
            </div>
        </div>
    )
}