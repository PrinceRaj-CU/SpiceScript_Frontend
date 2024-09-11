import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import '../ScrollingText.css';

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`https://spicescript-backend.onrender.com/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipe();
  }, [userID]);

  const deleteRecipe = async (recipeID) => {
    try {
      const cookieData = cookie?.alpha;
      const response = await axios.patch(
        "https://spicescript-backend.onrender.com/recipes/delete",
        {
          recipeID,
        },
        {
          headers: {
            "Authorization": `Bearer ${cookieData}`,
          },
        }
      );
  
      // Filter out the deleted recipe from the savedRecipes array in the state
      setSavedRecipes((prevRecipes) => 
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="scrolling-container bg-gray-300 mt-1 mb-3 ">
      <h1 className="scrolling-text">YOUR SAVED DISHES😋</h1>
    </div>
      <div className=' grid grid-flow-row gap-3 xl:grid-cols-4 grid-cols-1 md:grid-cols-3 mr-3 ml-3'>
        {savedRecipes?.map((recipe) => (
          <div className='  hover:scale-105 transition-all duration-200 border-gray-700 bg-gray-200 border-2 rounded-lg p-1 hover:shadow-lg cursor-pointer ' key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button className="rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-3 py-2 text-sm font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#00C9FF]/50" onClick={() => deleteRecipe(recipe._id)}>Remove</button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedRecipe;
