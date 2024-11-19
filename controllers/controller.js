const { query } = require("express");
const pool =  require("../db/pool");
const queries = require('../db/queries');



const homePage = (req,res) => {
    res.render("homepage");
}


const getMovie = (req,res) => {
    
    pool.query(queries.getMovie,(error,results) => {
        if(error) throw error;
        const movies = results.rows;
        res.render("moviedetail" , {movies});
    });
}

const movieCategory = (req,res) => {
    pool.query(queries.getMovie, (error,results) => {
        if (error) throw error;
        const movies = results.rows;
        res.render("category", {movies});
       
    })
}


const loadEditForm = (req, res) => {
    const movieId = parseInt(req.params.id);

    pool.query(queries.getMovieById, [movieId], (error, results) => {
        if (error) {
            console.error("Error fetching movie:", error);
            return res.status(500).send("Internal Server Error");
        }

        if (!results.rows.length) {
            return res.status(404).send("Movie not found");
        }

        const movie = results.rows[0];
        res.render("editmovie", { movie });
    });
};

const editMovie = (req, res) => {
    const movieId = parseInt(req.params.id);
    const { name,genre, year, country } = req.body;

    if (!name || !genre || !year || !country) {
        return res.status(400).send("All fields (name, year, country) are required.");
    }

    pool.query(queries.updateMovie, [name, genre, year, country, movieId], (error, results) => {
        if (error) {
            console.error("Error updating movie:", error);
            return res.status(500).send("Internal Server Error");
        }

        res.redirect('/moviedetail'); 
    });
};

const removeMovie = (req, res) => {
    const movieId = parseInt(req.params.id);
    
    pool.query(queries.deleteMovie, [movieId], (error, results) => {
        if (error) {
            console.error("Error deleting movie:", error);
            return res.status(500).json({ error: "Error deleting movie" });
        }
        
        res.status(200).json({ message: "Movie deleted successfully" });
    });
};

const addMovie = (req, res) => {
    const { name, genre, year, country } = req.body;

    pool.query('SELECT * FROM movie WHERE name = $1 AND genre = $2 AND year = $3 AND country = $4', [name, genre, year, country], (error, results) => {
        if (error) {
            console.error("Error checking movie existence:", error);
            return res.status(500).send("Internal Server Error");
        }

        if (results.rows.length > 0) {
            return res.send("The movie already exists.");
        }

        pool.query(queries.addingMovie, [name,genre, year, country], (error, results) => {
            if (error) {
                console.error("Error adding movie:", error);
                return res.status(500).send("Internal Server Error");
            }

            res.redirect('/moviedetail');
        });
    });
};



const showAddForm = (req, res) => {
    res.render("addmovie"); // Render the "addmovie.ejs" form
};

module.exports = {
    getMovie,
    homePage,
    movieCategory,
    loadEditForm,
    editMovie,
    removeMovie,
    addMovie,
    showAddForm,
}