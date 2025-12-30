import {Client, Account, Query, ID, Databases, TablesDB} from 'appwrite';
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;

export const client = new Client();
client
    .setEndpoint(`${endpoint}`)
    .setProject(`${project_id}`);

const database = new TablesDB(client);

export const updateSearch = async (searchTerm,movie) => {
    try{
        const result = await database.listRows(database_id,"views",[
            Query.equal("movie_id",movie.id),
        ]);
        if (result.rows.length > 0) {
            const data = result.rows[0];
            await database.updateRow(database_id,"views",data.$id, {count: data.count +1})
        }else{
            await database.createRow(database_id,"views",ID.unique(),{
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }
    }catch{
    }
}

export const getMoviesTrending = async () =>{
    try{
        const result = await database.listRows(database_id,"views",[
            Query.limit(5),
            Query.orderDesc("count")
        ]);
        return result.rows;
    }catch{
    }
}
