import MovieView from "./src/views/MovieView";
import ObserveView from "./src/views/ObserveView";
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
    {
        name: "Observe",
        component: ObserveView
    },
]

export default routes;