import MovieView from "./src/views/MovieView";
import SearchView from "./src/views/SearchView";

const routes = [
    {
        name: "Search",
        component: SearchView
    },
    {
        name: "Movie",
        component: MovieView
    },
]

export default routes;