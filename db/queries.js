const getMovie = "SELECT * FROM movie"; 
const getMovieById = "SELECT * FROM movie WHERE id = $1"; 
const updateMovie = "UPDATE movie SET name = $1, genre = $2, year = $3, country = $4 WHERE id = $5"; 
const deleteMovie = "DELETE FROM movie WHERE id = $1";
const addingMovie = "INSERT INTO movie (name,genre,year,country) VALUES ($1,$2,$3,$4)";

module.exports = {
    getMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    addingMovie
};
