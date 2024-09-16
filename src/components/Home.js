import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import {RingLoader} from 'react-spinners';
import '../ScrollingText.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] =useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cookie,setCookie]= useCookies();

  const userID = useGetUserID();

  useEffect(()=>{

    const fetchRecipe = async ()=>{
      setLoading(true);
      try {
        const response = await axios.get(`https://spicescript-backend.onrender.com/recipes?page=${currentPage}&limit=8`);
        setRecipes(response.data.recipes);
        console.log(recipes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error)
      }finally {
        setLoading(false);
    }
    };
    
    const fetchSavedRecipe = async ()=>{
      try {
        const response = await axios.get(`https://spicescript-backend.onrender.com/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response?.data?.savedRecipes || []);
      } catch (error) {
        console.log(error)
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, [currentPage]);

  const saveRecipe = async (recipeID) => {
    try {
        const cookieData = cookie?.alpha;
        console.log(cookieData);

        const response = await axios.put(
            "https://spicescript-backend.onrender.com/recipes",
            {
                recipeID,
                userID,
            },
            {
                headers: {
                    "Authorization": `Bearer ${cookieData}`,
                },
            }
        );

        setSavedRecipes(response?.data?.savedRecipes);
    } catch (error) {
        console.log(error);
    }
};

  

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
    <Navbar/>
    <div className="scrolling-container bg-gray-300 mt-1 mb-3 ">
      <h1 className="scrolling-text">THE FLAVOURS OF YOUR WISH😋 "SPICESCRIPT"</h1>
    </div>
    {loading ? (
            <RingLoader color="#1d9cc2" />
        ) : (
    <div className=' grid grid-flow-row gap-3 xl:grid-cols-4 grid-cols-1 md:grid-cols-3 mr-3 ml-3'>
      {recipes?.map((recipe)=>(
        <div className='  hover:scale-105 transition-all duration-200 shadow-xl shadow-gray-300 bg-white rounded-lg p-1 hover:shadow-lg cursor-pointer p-2' key={recipe._id}>
          <div >
            <h2>{recipe.name}</h2>
            <button className="rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-3 py-2 text-sm font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#00C9FF]/50" onClick={()=> saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id)? "Saved":"Save"}</button>
          </div>
          <div className='instructions'>
            <p>{recipe.instructions}</p>
          </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
        </div>
      ))}
    </div>
    )}
    <div className='w-full'>
    <div className='pagination bg-gray-300 mt-3 p-1 max-w-full overflow-x-hidden'>
    <div className='flex justify-center space-x-4'>
        <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Next
        </button>
    </div>
    </div>
    </div>
    </>
  )
}

export default Home