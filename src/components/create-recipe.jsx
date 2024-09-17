import axios from 'axios';
import '../App.css'
import React, { useState } from 'react';
import useGetUserID from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import createWallpaper from '../create-recipe-wp.jpg';

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name:"",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate()

  const handleChange=(event)=>{
    const {name, value} =event.target;
    setRecipe({...recipe, [name]: value});
  };

  const handleIngredientChange=(event, idx)=>{
    const {value}=event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] =value;
    setRecipe({...recipe, ingredients: ingredients});
  };

  const addIngredient=()=>{
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  };

  const onSubmit=  async(event)=>{
    event.preventDefault();
    try {
      await axios.post("https://spicescript-backend.onrender.com/recipes", recipe);
      alert("Recipe Successfully created");
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  // This form is designed for users to create and submit their own recipes. Users can input the recipe name, ingredients, instructions, image URL, and cooking time. The submitted data will be used to build a card that is displayed on the homepage. When a user saves a recipe, the card will also be saved to their "Saved Recipes" page. The app uses JWT tokens to track which user has saved which recipes.

  return (
    <>
    <Navbar/>
    <div className= "flex flex-col justify-center items-center bg-cover bg-center w-full"
  style={{ backgroundImage: `url(${createWallpaper})`, height: '100vh' }}>
    <div className="flex flex-col justify-center items-center p-5 bg-black bg-opacity-50 rounded-lg shadow-md w-[400px]">
      <h2 className='text-white'>Create Recipe</h2>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={handleChange}/>

        <label htmlFor='ingredients'>ingredients</label>
        <div className='flex flex-col gap-2 '>
        {recipe.ingredients.map((ingrediet, idx)=>(
          <input className='pt-2' key={idx}
          type='text'
          name='ingredients'
          value={ingrediet}
          onChange={(event)=>handleIngredientChange(event, idx)}/>
        ))}</div>
        <button className="text-white bg-gradient-to-r from-yellow-400 to-green-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-0 mt-2" onClick={addIngredient} type='button'>Add ingredients</button>

        <label htmlFor='instructions'>instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>

        <label htmlFor='imageUrl'>Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/>
        
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input className="mb-2" type='number' id='cookingTime' name='cookingTime' onChange={handleChange}/>

        <button className="text-white bg-gradient-to-r from-yellow-400 to-green-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-0" type='submit'>Create Recipe </button>
      </form>
    </div>
    </div>
    </>
  )
}

export default CreateRecipe