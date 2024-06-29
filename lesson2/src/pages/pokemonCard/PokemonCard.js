import React, {useEffect, useState} from 'react';
import classes from "./PokemonCard.module.css";

const PokemonCard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 21;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                setPokemonList(data.results);
                setTotalPages(Math.ceil(data.count / itemsPerPage));

                const promises = data.results.map(pokemon =>
                    fetch(pokemon.url).then(response => response.json())
                );

                Promise.all(promises)
                    .then(detailsArray => {
                        const detailsObject = detailsArray.reduce((acc, details) => {
                            acc[details.name] = details;
                            return acc;
                        }, {});
                        setPokemonDetails(detailsObject);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [currentPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={classes.pokAll}>
            <h1 className={classes.pok}>Pokemon</h1>
            <div className={classes.pokemonList}>
                {pokemonList.map(pokemon => (
                            <div className={classes.pokemonCard} key={pokemon.name}>
                                <img
                                    src={pokemonDetails[pokemon.name].sprites.other.dream_world.front_default}
                                    alt={pokemonDetails[pokemon.name].name}
                                />
                                <h2>{pokemonDetails[pokemon.name].name}</h2>
                                <button>Подробнее</button>
                            </div>
                        ))}
            </div>
            <div className={classes.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
                    );
                };

export default PokemonCard;
